import { generateText } from 'ai'
import { geminiModel } from './llm.js'
import type { SupportAgentInput, AgentResponse } from './agent.interface.js'

export class BillingAgent {
  async handle(
    input: SupportAgentInput
  ): Promise<AgentResponse> {
    const prompt = `
You are a billing support agent.

Handle:
- payment issues
- refunds
- invoices

If exact billing data is missing, respond clearly
and explain next steps.

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
