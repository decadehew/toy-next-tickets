import { notFound } from 'next/navigation'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Separator } from '@/components/ui/separator'
import { homePath } from '@/paths'
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
    <div className="flex flex-col gap-y-8 flex-1">
      <Breadcrumbs
        breadcrumbs={[
          { title: 'Tickets', href: homePath() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  )
}
