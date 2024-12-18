import { Heading } from '@/components/heading'
import { Suspense } from 'react'
import { TicketList } from '@/features/ticket/components/ticket-list'
import { Spinner } from '@/components/spinner'
import { CardCompact } from '@/components/card-compact'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'

export default function TicketsPage() {
  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  )
}
