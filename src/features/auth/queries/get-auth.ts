'use server'

/**
 * 使用了 cookies() from next/headers，這個 API 只能在 Server Components 中使用
 * 我在 header.tsx 中使用，但此組件是 client component，所以必須使用 server action
 */

import { validateSession } from '@/lib/lucia'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { SESSION_COOKIE_NAME } from '@/features/auth/utils/session-cookie'

export const getAuth = cache(async () => {
  const sessionToken = (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null

  if (!sessionToken) {
    return {
      user: null,
      session: null,
    }
  }

  return await validateSession(sessionToken)
})
