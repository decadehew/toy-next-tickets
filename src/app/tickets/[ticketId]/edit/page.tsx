import { notFound } from 'next/navigation'

import { getTicket } from '@/features/ticket/queries/get-ticket'
import { CardCompact } from '@/components/card-compact'
import { TicketEditForm } from '@/features/ticket/components/ticket-edit-form'

interface TicketEditPageProps {
  params: { ticketId: string }
}

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { ticketId } = await params
  const ticket = await getTicket(ticketId)

  if (!ticket) {
    notFound()
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit the ticket"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<TicketEditForm ticket={ticket} />}
      />
    </div>
  )
}

export default TicketEditPage
