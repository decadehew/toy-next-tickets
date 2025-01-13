'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { setCookieByKey } from '@/actions/cookies'
import { ticketsPath } from '@/paths'
import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { isOwner } from '@/features/auth/utils/is-owner'

export const deleteTicket = async (id: string) => {
  const { user } = await getAuthOrRedirect()
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id } })

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState('ERROR', 'Not authorized')
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
