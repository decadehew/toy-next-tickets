'use client'

import { usePathname } from 'next/navigation'

import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const RedirectToast = () => {
  const pathname = usePathname()

  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey('toast')

      if (message) {
        toast.success(message)
        deleteCookieByKey('toast')
      }
    }

    showCookieToast()
  }, [pathname])

  return null
}
