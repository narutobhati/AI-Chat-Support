import { streamText } from 'ai'
import { geminiModel } from './llm.js'
import { getPaymentById } from './tools/billing.tools.js'
import type { SupportAgentInput } from './agent.interface.js'

export class BillingAgent {
  async stream(input: SupportAgentInput) {

    // Optional simple extraction
    const paymentMatch = input.message.match(/pay[_\s]?(\d+)/i)

    let paymentData = null
    if (paymentMatch) {
      paymentData = await getPaymentById(`pay_${paymentMatch[1]}`)
    }

    const prompt = `
You are a billing support agent.

Handle:
- payment issues
- refunds
- invoices

Payment data:
${paymentData ? JSON.stringify(paymentData) : 'No payment found'}

Conversation summary:
${input.context.summary ?? 'None'}

User message:
${input.message}
    `.trim()

    return streamText({
      model: geminiModel,
      prompt
    })
  }
}
