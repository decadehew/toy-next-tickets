import { Ticket } from '@prisma/client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateTicket } from '../actions/update-ticket'
interface TicketEditFormProps {
  ticket: Ticket
}

export const TicketEditForm = ({ ticket }: TicketEditFormProps) => {
  return (
    <form
      action={updateTicket.bind(null, ticket.id)}
      className="flex flex-col gap-y-2"
    >
      <Label htmlFor="title">Title</Label>
      <Input id="title" type="text" name="title" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>
      <Input
        id="content"
        type="text"
        name="content"
        defaultValue={ticket.content}
      />

      <Button type="submit">Update</Button>
    </form>
  )
}
