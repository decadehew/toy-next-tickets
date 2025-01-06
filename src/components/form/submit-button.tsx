'use client'

import { LucideLoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from '@/components/ui/button'
import clsx from 'clsx'
import { cloneElement } from 'react'

interface SubmitButtonProps {
  label?: string
  icon?: React.ReactElement
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}
export const SubmitButton = ({
  label,
  icon,
  variant,
  size,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()
  // const pending = true

  return (
    <Button type="submit" disabled={pending} variant={variant} size={size}>
      {pending && (
        <LucideLoaderCircle
          className={clsx('h-4 w-4 animate-spin', {
            'mr-2': !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span className={clsx({ 'ml-2': !!label })}>
          {cloneElement(icon, {
            className: 'h-4 w-4',
          })}
        </span>
      ) : null}
    </Button>
  )
}
