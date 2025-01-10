'use server'

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { ticketsPath } from '@/paths'
import { verifyPasswordHash } from '@/features/password/utils/hash-and-verify'
import { createSession } from '@/lib/lucia'
import { setSessionCookie } from '@/features/auth/utils/session-cookie'
import { generateRandomToken } from '@/utils/crypto'

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

    const validPassword = await verifyPasswordHash(user.passwordHash, password)

    if (!validPassword) {
      return toActionState('ERROR', 'Incorrect email or password', formData)
    }

    const sessionToken = generateRandomToken()
    const session = await createSession(sessionToken, user.id)

    await setSessionCookie(sessionToken, session.expiresAt)
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }

  redirect(ticketsPath())
}
