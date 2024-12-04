'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
// import { createTicket } from '../actions/create-ticket'

const TicketCreateForm = () => {
  const createTicket = (formData: FormData) => {
    // 'use server'

    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
    }

    alert(JSON.stringify(data))
    console.log('test', data)
  }
  return (
    <form action={createTicket} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />
      <Button type="submit">Create Ticket</Button>
    </form>
  )
}

export { TicketCreateForm }
