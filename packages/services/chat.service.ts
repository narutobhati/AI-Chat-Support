import { prisma } from '@repo/db'
import { RouterAgent, AgentService } from '@repo/agents'
import { ConversationService } from './conversation.service.js'

export class ChatService {
  private conversationService = new ConversationService()
  private routerAgent = new RouterAgent()
  private agentService = new AgentService()

  async streamMessage(input: {
    conversationId: string
    message: string
  }) {
    const { conversationId, message } = input

    await prisma.message.create({
      data: {
        conversationId,
        role: 'user',
        content: message
      }
    })

    const context =
      await this.conversationService.loadConversation(conversationId)

    const route = await this.routerAgent.route(message, context)

    const stream = await this.agentService.stream(
      route.agent,
      message,
      context
    )

    let fullReply = ''

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream.textStream) {
          fullReply += chunk
          controller.enqueue(chunk)
        }

        controller.close()

        await prisma.message.create({
          data: {
            conversationId,
            role: 'agent',
            content: fullReply
          }
        })
      }
    })

    return readable
  }
}
