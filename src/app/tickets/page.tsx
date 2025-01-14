import { Heading } from '@/components/heading'
import { Suspense } from 'react'
import { TicketList } from '@/features/ticket/components/ticket-list'
import { Spinner } from '@/components/spinner'
import { CardCompact } from '@/components/card-compact'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { getAuth } from '@/features/auth/queries/get-auth'

export default async function TicketsPage() {
  const { user } = await getAuth()

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} />
      </Suspense>
    </div>
  )
}
