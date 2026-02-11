import { prisma } from '@repo/db'

export async function getPaymentById(paymentId: string) {
  return prisma.payment.findUnique({
    where: { id: paymentId }
  })
}
