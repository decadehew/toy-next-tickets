import { Ticket } from '@prisma/client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { upsertTicket } from '../actions/upsert-ticket'
import { SubmitButton } from '@/components/form/submit-button'

interface TicketUpsertFormProps {
  ticket?: Ticket
}
export const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  return (
    <form
      action={upsertTicket.bind(null, ticket?.id)}
      className="flex flex-col gap-y-2"
    >
      <Label htmlFor="title">Title</Label>
      <Input id="title" type="text" name="title" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Input
        id="content"
        type="text"
        name="content"
        defaultValue={ticket?.content}
      />

      <SubmitButton label={ticket ? 'Edit' : 'Create'} />
    </form>
  )
}
