import { getTickets } from '../queries/get-tickets'
import { TicketItem } from './ticket-item'

interface TicketListProps {
  userId?: string
}

export const TicketList = async ({ userId }: TicketListProps) => {
  const tickets = await getTickets(userId)

  return (
    <div className="flex flex-col items-center flex-1 gap-y-4 animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}
