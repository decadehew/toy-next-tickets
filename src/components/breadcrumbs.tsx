import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Fragment } from 'react'

type BreadcrumbsProps = {
  breadcrumbs: {
    title: string
    href?: string
  }[]
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          let breadcrumbItem = (
            <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
          )

          if (breadcrumb.href) {
            breadcrumbItem = (
              <BreadcrumbLink href={breadcrumb.href} asChild>
                <Link
                  href={breadcrumb.href}
                  className="flex items-center gap-1"
                >
                  {breadcrumb.title}
                </Link>
              </BreadcrumbLink>
            )
          }

          return (
            <Fragment key={breadcrumb.title}>
              <BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
