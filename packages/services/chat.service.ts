import { ConversationService } from '@repo/services'
import { RouterAgent } from '@repo/agents'


export type SendMessageInput = {
  conversationId: string
  message: string
}

export type SendMessageOutput = {
  conversationId: string
  reply: string
}

export class ChatService {
  private conversationService = new ConversationService()
  private routerAgent = new RouterAgent()

  async sendMessage(input: {
    conversationId: string
    message: string
  }) {
    const context =
      await this.conversationService.loadConversation(
        input.conversationId
      )

    const route = await this.routerAgent.route(
      input.message,
      context
    )

    return {
      conversationId: input.conversationId,
      reply: `Routed to ${route.agent} agent`
    }
  }
}