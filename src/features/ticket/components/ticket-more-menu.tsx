'use client'

import { Ticket, TicketStatus } from '@prisma/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LucideTrash } from 'lucide-react'
import { TICKET_STATUS_LABELS } from '@/features/ticket/constants'
import { updateTicketStatus } from '@/features/ticket/actions/update-ticket-status'
import { deleteTicket } from '@/features/ticket/actions/delete-ticket'
import { toast } from 'sonner'
import { useConfirmDialog } from '@/components/confirm-dialog'

interface TicketMoreMenuProps {
  ticket: Ticket
  trigger: React.ReactElement
}

export const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="w-4 h-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  })

  const handleUpdateTicketStatus = async (status: string) => {
    const promise = updateTicketStatus(ticket.id, status as TicketStatus)

    toast.promise(promise, {
      loading: 'Updating ticket status...',
    })

    const result = await promise
    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else if (result.status === 'SUCCESS') {
      toast.success(result.message)
    }
  }
  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  )

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
