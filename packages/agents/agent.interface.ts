import type { ConversationContext } from '@repo/services'

export interface SupportAgentInput {
  message: string
  context: ConversationContext
}

export interface AgentResponse {
  reply: string
}
