'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { toCent } from '@/utils/currency'

const UpsertTicketSchema = z.object({
  title: z.string().min(1, '標題不能為空').max(191, '標題不能超過191個字符'),
  content: z
    .string()
    .min(1, '內容不能為空')
    .max(1024, '內容不能超過1024個字符'),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '截止日期格式錯誤'),
  bounty: z.coerce.number().positive({ message: '賞金不能為負數' }),
})

const upsertTicket = async (
  id: string | undefined,
  // 請查看筆記
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = UpsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    })

    const formattedData = {
      ...data,
      bounty: toCent(data.bounty),
    }

    await prisma.ticket.upsert({
      where: { id: id || '' },
      create: formattedData,
      update: formattedData,
    })
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }

  revalidatePath(ticketsPath())

  if (id) {
    redirect(ticketPath(id))
  }

  return toActionState('SUCCESS', 'Ticket created!')
}

export { upsertTicket }
