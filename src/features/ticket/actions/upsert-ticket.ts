'use server'

import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const upsertTicket = async (id: string | undefined, formData: FormData) => {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  }

  await prisma.ticket.upsert({
    where: { id: id || '' },
    create: data,
    update: data,
  })

  revalidatePath(ticketsPath())

  if (id) {
    redirect(ticketPath(id))
  }
}

export { upsertTicket }
