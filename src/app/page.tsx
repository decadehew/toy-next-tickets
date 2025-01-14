import { ticketsPath } from '@/paths'
import { Heading } from '@/components/heading'
import { Suspense } from 'react'
import { Spinner } from '@/components/spinner'
import { TicketList } from '@/features/ticket/components/ticket-list'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title="All Tickets"
        description="All your tickets at one place"
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  )
}
