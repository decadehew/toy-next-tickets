import Link from 'next/link'
import { ticketsPath } from '@/paths'
import { Heading } from '@/components/heading'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Heading
        title="Home"
        description="Welcome to TicketBounty, your ticket management solution"
      />

      <div className="flex-1 flex flex-col items-center">
        <Link className="underline" href={ticketsPath()}>
          View all tickets
        </Link>
      </div>
    </div>
  )
}
