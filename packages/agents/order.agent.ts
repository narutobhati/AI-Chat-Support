import { streamText } from 'ai'
import { geminiModel } from './llm.js'
import { getOrderById } from './tools/order.tools.js'
import type { SupportAgentInput } from './agent.interface.js'

export class OrderAgent {
  async stream(input: SupportAgentInput) {

    const orderMatch = input.message.match(/order[_\s]?(\d+)/i)

    let orderData = null
    if (orderMatch) {
      orderData = await getOrderById(`order_${orderMatch[1]}`)
    }

    const prompt = `
You are an order support agent.

Order data:
${orderData ? JSON.stringify(orderData) : 'No order found'}

User message:
${input.message}
    `.trim()

    return streamText({
      model: geminiModel,
      prompt
    })
  }
}
