import { getAuth } from '@/features/auth/queries/get-auth'
import { useState, useEffect } from 'react'
import { User } from '@prisma/client'
import { usePathname } from 'next/navigation'

/**
 * 轉換成 client-side render，我猜測：
 * 避免動態 render (npm run build 後會有標記為 dynamic render)
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isFetched, setIsFetched] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    const fetchUser = async () => {
      // 當作換成調用 webapi 形式
      const { user } = await getAuth()
      setUser(user)
      setIsFetched(true)
    }

    fetchUser()
  }, [pathname])

  return { user, isFetched }
}
