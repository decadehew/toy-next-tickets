'use client'

import { useTransition } from 'react'
import { Ticket } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { upsertTicket } from '../actions/upsert-ticket'
import { LucideLoaderCircle } from 'lucide-react'

interface TicketUpsertFormProps {
  ticket?: Ticket
}
export const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [isPending, startTransition] = useTransition()
  const upsertTicketAction = async (formData: FormData) => {
    startTransition(async () => {
      await upsertTicket(ticket?.id, formData)
    })
  }
  return (
    <form action={upsertTicketAction} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" type="text" name="title" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Input
        id="content"
        type="text"
        name="content"
        defaultValue={ticket?.content}
      />

      <Button type="submit" disabled={isPending}>
        {isPending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
        {ticket ? 'Edit' : 'Create'}
      </Button>
    </form>
  )
}
