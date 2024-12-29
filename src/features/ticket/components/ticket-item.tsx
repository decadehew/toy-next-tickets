// 'use client'

import Link from 'next/link'
import { Ticket } from '@prisma/client'
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ticketEditPath, ticketPath } from '@/paths'

import { TICKET_ICONS } from '../constants'

import { cn } from '@/lib/utils'
import { toCurrencyFromCent } from '@/utils/currency'
import { TicketMoreMenu } from './ticket-more-menu'

interface TicketItemProps {
  // 以下寫法，另一種寫法 optional
  // ticket:
  //   | Awaited<ReturnType<typeof getTickets>>[number]
  //   | Awaited<ReturnType<typeof getTicket>>
  ticket: Ticket
  isDetail?: boolean
}

const TicketItem = ({ ticket, isDetail = false }: TicketItemProps) => {
  // console.log('我是 TicketItem 🔥🔥🔥🔥')
  // 基於 ticket 是 optional，所以需要先檢查
  // if (!ticket) return null

  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  )

  const editButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  )

  // const handleDeleteTicket = async () => {
  //   await deleteTicket(ticket.id)
  // }

  // const deleteButton = (
  //   // 如果不使用 client component
  //   // <Button size="icon" variant="destructive" onClick={handleDeleteTicket}>
  //   //   <LucideTrash className="w-4 h-4" />
  //   // </Button>

  //   // 換成 form action 來處理
  //   <form action={deleteTicket.bind(null, ticket.id)}>
  //     <DeleteButton />
  //   </form>
  // )

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="w-4 h-4" />
        </Button>
      }
    />
  )

  return (
    <div
      className={cn(
        'w-full flex gap-x-2',
        isDetail ? 'max-w-[580px]' : 'max-w-[420px]'
      )}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={cn(
              'whitespace-break-spaces',
              !isDetail && 'line-clamp-3'
            )}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          detailButton
        )}
      </div>
    </div>
  )
}

export { TicketItem }
