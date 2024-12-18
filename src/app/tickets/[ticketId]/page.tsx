import { notFound } from 'next/navigation'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTicket } from '@/features/ticket/queries/get-ticket'
type TicketPageProps = {
  params: Promise<{ ticketId: string }>
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params
  const ticket = await getTicket(ticketId)

  if (!ticket) {
    // console.log('ticket not found')
    notFound()
  }

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  )
}
