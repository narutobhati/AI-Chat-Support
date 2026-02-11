import { generateText } from 'ai'
import { geminiModel } from './llm.js'
import type { SupportAgentInput, AgentResponse } from './agent.interface.js'

export class OrderAgent {
  async handle(
    input: SupportAgentInput
  ): Promise<AgentResponse> {
    const prompt = `
You are an order support agent.

Handle:
- order status
- delivery questions
- cancellations

If you do not have order data yet, explain politely
that order lookup will be added soon.

Conversation summary:
${input.context.summary ?? 'None'}

User message:
${input.message}
    `.trim()

    const result = await generateText({
      model: geminiModel,
      prompt
    })

    return { reply: result.text }
  }
}
