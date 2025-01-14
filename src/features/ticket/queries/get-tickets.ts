import { prisma } from '@/lib/prisma'

export const getTickets = async (userId: string | undefined) => {
  // await new Promise((resolve) => setTimeout(resolve, 500))

  // throw new Error('Something went wrong')

  return await prisma.ticket.findMany({
    where: {
      userId,
    },
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
