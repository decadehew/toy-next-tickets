'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { setCookieByKey } from '@/actions/cookies'
import { ticketsPath } from '@/paths'
import { fromErrorToActionState } from '@/components/form/utils/to-action-state'

export const deleteTicket = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id } })
    if (!ticket) {
      throw new Error('Ticket not found!!!')
    }
    await prisma.ticket.delete({
      where: { id },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath('/tickets')
  await setCookieByKey('toast', 'Ticket deleted!')
  redirect(ticketsPath())
}
