import { notFound } from 'next/navigation'

import { getTicket } from '@/features/ticket/queries/get-ticket'
import { CardCompact } from '@/components/card-compact'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { getAuth } from '@/features/auth/queries/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { Separator } from '@/components/ui/separator'
import { homePath, ticketPath } from '@/paths'
import { Breadcrumbs } from '@/components/breadcrumbs'

interface TicketEditPageProps {
  params: Promise<{ ticketId: string }>
}

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { user } = await getAuth()
  const { ticketId } = await params
  const ticket = await getTicket(ticketId)

  const isTicketFound = !!ticket
  const isTicketOwner = isOwner(user, ticket)

  if (!isTicketFound || !isTicketOwner) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Breadcrumbs
        breadcrumbs={[
          { title: 'Tickets', href: homePath() },
          { title: ticket.title, href: ticketPath(ticketId) },
          { title: 'Edit' },
        ]}
      />
      <Separator />
      <div className="flex flex-col flex-1 justify-center items-center">
        <CardCompact
          title="Edit Ticket"
          description="Edit the ticket"
          className="w-full max-w-[420px] animate-fade-in-from-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  )
}

export default TicketEditPage
