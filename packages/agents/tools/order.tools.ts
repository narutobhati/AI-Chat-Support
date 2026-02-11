import { prisma } from '@repo/db'

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId }
  })
}
