'use server'

import { TicketStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ticketsPath } from '@/paths'
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { isOwner } from '@/features/auth/utils/is-owner'

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  const { user } = await getAuthOrRedirect()

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    })
    if (!ticket || !isOwner(user, ticket)) {
      return toActionState('ERROR', 'Not authorized')
    }

    await prisma.ticket.update({
      where: { id },
      data: { status },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath(ticketsPath())
  return toActionState('SUCCESS', 'Ticket status updated successfully')
}
