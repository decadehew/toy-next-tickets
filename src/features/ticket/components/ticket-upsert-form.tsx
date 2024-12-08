'use client'

import { Ticket } from '@prisma/client'
import { useActionState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { upsertTicket } from '../actions/upsert-ticket'
import { SubmitButton } from '@/components/form/submit-button'
import { FieldError } from '@/components/form/field-error'

interface TicketUpsertFormProps {
  ticket?: Ticket
}
export const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, formAction] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: '',
      fieldErrors: {},
    }
  )
  return (
    <form action={formAction} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        type="text"
        name="title"
        defaultValue={
          (actionState.payload?.get('title') as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Input
        id="content"
        type="text"
        name="content"
        defaultValue={
          (actionState.payload?.get('content') as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label={ticket ? 'Edit' : 'Create'} />
      {actionState.message}
    </form>
  )
}
