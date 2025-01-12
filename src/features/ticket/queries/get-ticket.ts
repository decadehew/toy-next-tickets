import { prisma } from '@/lib/prisma'

export const getTicket = async (id: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 500))

  // throw new Error('Not implemented')

  return await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  })
}
