'use server'

/**
 * 使用了 cookies() from next/headers，這個 API 只能在 Server Components 中使用
 * 我在 header.tsx 中使用，但此組件是 client component，所以必須使用 server action
 */

import { lucia } from '@/lib/lucia'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const getAuth = cache(async () => {
  const sessionId =
    (await cookies()).get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId) {
    return {
      user: null,
      session: null,
    }
  }

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      ;(await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      ;(await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch {}

  return result
})
