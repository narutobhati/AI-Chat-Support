import { prisma } from '../packages/db/client'

async function main() {
  await prisma.order.createMany({
    data: [
      {
        id: 'order_123',
        status: 'shipped',
        expectedDelivery: '2026-02-15'
      }
    ]
  })

  await prisma.payment.createMany({
    data: [
      {
        id: 'pay_1',
        amount: 1999,
        status: 'completed',
        invoiceId: 'inv_001'
      }
    ]
  })

  console.log('Seed complete')
}

main().finally(() => prisma.$disconnect())
