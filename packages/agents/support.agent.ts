import { streamText } from 'ai'
import { geminiModel } from './llm.js'
import type { SupportAgentInput } from './agent.interface.js'

export class SupportAgent {
  async stream(input: SupportAgentInput) {
    const prompt = `
You are a customer support assistant.

Answer clearly and concisely.
Use the conversation context if relevant.

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
