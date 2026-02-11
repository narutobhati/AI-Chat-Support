import { Hono } from 'hono'
import { ChatService } from '@repo/services'

export const chatRoutes = new Hono()
  .post('/messages', async (c) => {
    const body = await c.req.json()

    const chatService = new ChatService()

    const stream = await chatService.streamMessage({
      conversationId: body.conversationId,
      message: body.message
    })

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain' }
    })
  })
