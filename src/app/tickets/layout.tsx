import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  await getAuthOrRedirect()

  return <>{children}</>
}
