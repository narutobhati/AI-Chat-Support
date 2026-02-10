import { generateText } from 'ai'
import { geminiModel } from './llm.js'
import type { RouterResult } from './types.js'
import type { ConversationContext } from '@repo/services'


export class RouterAgent {
  async route(
    userMessage: string,
    context: ConversationContext
  ): Promise<RouterResult> {
    const prompt = `
You are a router for a customer support system.

Your job is to decide which agent should handle the user query.

Available agents:
- support: general help, FAQs, troubleshooting
- order: order status, delivery, cancellation
- billing: payments, refunds, invoices
- fallback: unclear or unrelated queries

Conversation summary:
${context.summary ?? 'None'}

User message:
${userMessage}

Respond with ONLY valid JSON:
{ "agent": "support | order | billing | fallback" }
    `.trim()

    const result = await generateText({
      model: geminiModel,
      prompt
    })

    try {
      return JSON.parse(result.text) as RouterResult
    } catch {
      return { agent: 'fallback' }
    }
  }
}
