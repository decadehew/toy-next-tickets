'use server'
import { getAuth } from '@/features/auth/queries/get-auth'
import { signInPath } from '@/paths'
import { redirect } from 'next/navigation'
import { invalidateSession } from '@/lib/lucia'
import { deleteSessionCookie } from '@/features/auth/utils/session-cookie'

export const signOut = async () => {
  const { session } = await getAuth()

  if (!session) {
    redirect(signInPath())
  }

  await invalidateSession(session.id)
  await deleteSessionCookie()

  redirect(signInPath())
}
