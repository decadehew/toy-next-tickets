import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the first ticket from the database seed.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 399,
  },
  {
    title: 'Ticket 2',
    content: 'This is the second ticket from the database seed.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 599,
  },
  {
    title: 'Ticket 3',
    content: 'This is the third ticket from the database seed.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    title: 'Ticket 4',
    content: 'This is the fourth ticket from the database seed.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 299,
  },
  {
    title: 'Ticket 5',
    content: 'This is the fifth ticket from the database seed.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 699,
  },
  {
    title: 'Ticket 6',
    content: 'This is the sixth ticket from the database seed.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 799,
  },
  {
    title: 'Ticket 7',
    content: 'This is the seventh ticket from the database seed.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 899,
  },
  {
    title: 'Ticket 8',
    content: 'This is the eighth ticket from the database seed.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 999,
  },
  {
    title: 'Ticket 9',
    content: 'This is the ninth ticket from the database seed.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 199,
  },
  {
    title: 'Ticket 10',
    content: 'This is the tenth ticket from the database seed.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 699,
  },
]

const seed = async () => {
  // for (const ticket of tickets) {
  //   await prisma.ticket.create({ data: ticket })
  // }

  // const promises = tickets.map(async (ticket) => {
  //   await prisma.ticket.create({ data: ticket })
  // })

  // await Promise.all(promises)
  const t0 = performance.now()

  await prisma.ticket.deleteMany()

  await prisma.ticket.createMany({ data: tickets })
  const t1 = performance.now()
  console.log(`Database seeded successfully in ${t1 - t0} milliseconds.`)
}

seed()
