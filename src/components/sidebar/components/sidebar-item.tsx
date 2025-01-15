import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from '../types'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { cloneElement } from 'react'
import { closedClassName } from '../constants'
import { Separator } from '@/components/ui/separator'

interface SidebarItemProps {
  isOpen: boolean
  navItem: NavItem
}
const SidebarItem = ({ isOpen, navItem }: SidebarItemProps) => {
  const path = usePathname()
  const isActive = path === navItem.href

  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group relative flex h-12',
          isOpen ? 'justify-start' : 'justify-center',
          isActive && 'bg-muted font-bold hover:bg-muted'
        )}
      >
        {cloneElement(navItem.icon, { className: 'h-5 w-5' })}
        <span
          className={cn(
            'absolute left-12 text-base duration-200',
            isOpen ? 'md:block hidden' : 'w-[78px]',
            !isOpen && closedClassName
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  )
}

export { SidebarItem }
