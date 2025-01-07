'use server'

import { verify } from '@node-rs/argon2'
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { lucia } from '@/lib/lucia'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ticketsPath } from '@/paths'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email 是必填' })
    .email({ message: 'Email 格式不正确' }),
  password: z.string().min(6).max(191),
})

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(Object.fromEntries(formData))

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return toActionState('ERROR', 'Incorrect email or password', formData)
    }

    const validPassword = await verify(user.passwordHash, password)

    if (!validPassword) {
      return toActionState('ERROR', 'Incorrect email or password', formData)
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    ;(await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    // return {
    //   success: 'Sign up successful',
    // }
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }

  redirect(ticketsPath())
}
