'use server'

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import { ticketsPath } from '@/paths'
import { hashPassword } from '@/features/password/utils/hash-and-verify'
import { createSession } from '@/lib/lucia'
import { generateRandomToken } from '@/utils/crypto'
import { setSessionCookie } from '@/features/auth/utils/session-cookie'

const signUpSchema = z
  .object({
    username: z
      .string({ required_error: 'Username 是必填' })
      .min(1)
      .max(191)
      .refine((value) => !value.includes(' '), {
        message: 'Username cannot contain spaces',
      }),
    email: z
      .string()
      .min(1, { message: 'Email 是必填' })
      .email({ message: 'Email 格式不正确' }),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '两次密码不一致',
        path: ['confirmPassword'],
      })
    }
  })

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    )

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    })

    const sessionToken = generateRandomToken()
    const session = await createSession(sessionToken, user.id)

    await setSessionCookie(sessionToken, session.expiresAt)
  } catch (error) {
    // console.log('xxx', error)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      // console.log('xxx', error)
      return toActionState(
        'ERROR',
        'Either email or username is already in use',
        formData
      )
    }

    return fromErrorToActionState(error, formData)
  }

  redirect(ticketsPath())
}
