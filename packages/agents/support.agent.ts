import { generateText } from 'ai'
import { geminiModel } from './llm.js'
import type { SupportAgentInput, AgentResponse } from './agent.interface.js'

export class SupportAgent {
  async handle(
    input: SupportAgentInput
  ): Promise<AgentResponse> {
    const prompt = `
You are a customer support assistant.

Answer clearly and concisely.
Use the conversation context if relevant.

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
