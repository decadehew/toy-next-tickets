'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// TODO: 如果 id 不存在的話，要如何處理，防止報錯

export const deleteTicket = async (id: string) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
  })

  if (!ticket) {
    throw new Error('測試中：Ticket not found')
  }

  await prisma.ticket.delete({
    where: { id },
  })

  revalidatePath('/tickets')
  redirect('/tickets')
}
