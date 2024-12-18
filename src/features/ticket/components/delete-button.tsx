'use client'

import { LucideLoaderCircle, LucideTrash } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export const DeleteButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button size="icon" variant="destructive" type="submit" disabled={pending}>
      {pending ? (
        <LucideLoaderCircle className="w-4 h-4 animate-spin" />
      ) : (
        <LucideTrash className="w-4 h-4" />
      )}
    </Button>
  )
}
