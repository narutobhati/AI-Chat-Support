import { ConversationService } from '@repo/services'
import { RouterAgent, AgentService } from '@repo/agents'

import { prisma } from '@repo/db'

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
  private agentService = new AgentService()

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

    const response = await this.agentService.handle(
      route.agent,
      input.message,
      context
    )
    await prisma.message.create({
      data: {
        conversationId: input.conversationId,
        role: 'user',
        content: input.message
      }
    })

    await prisma.message.create({
      data: {
        conversationId: input.conversationId,
        role: 'agent',
        content: response.reply
      }
    })


    return {
      conversationId: input.conversationId,
      reply: response.reply
    }
  }
}