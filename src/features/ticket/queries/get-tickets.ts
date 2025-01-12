import { prisma } from '@/lib/prisma'

export const getTickets = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 500))

  // throw new Error('Something went wrong')

  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: 'desc',
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
