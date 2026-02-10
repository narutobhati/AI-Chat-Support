import type {
  ConversationContext,
  ConversationMessage
} from './conversation-context'

export class ConversationService {
  async loadConversation(
    conversationId: string
  ): Promise<ConversationContext> {
    // ⛔ TEMP MOCK
    // Will be replaced by DB later

    const recentMessages: ConversationMessage[] = [
      {
        role: 'user',
        content: 'Hi, I need help'
      },
      {
        role: 'agent',
        content: 'Sure, what can I help you with?'
      }
    ]

    return {
      conversationId,
      summary: 'User previously asked for help',
      recentMessages
    }
  }
}
