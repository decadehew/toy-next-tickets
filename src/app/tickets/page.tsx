import { Heading } from '@/components/heading'
import { Suspense } from 'react'
import { TicketList } from '@/features/ticket/components/ticket-list'
import { Spinner } from '@/components/spinner'
import { TicketCreateForm } from '@/features/ticket/components/ticket-create-form'
import { CardCompact } from '@/components/card-compact'

export default function TicketsPage() {
  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketCreateForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
      {/* <Spinner /> */}
    </div>
  )
}
