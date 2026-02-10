import { Hono } from 'hono'
import { ChatService } from '@repo/services'
export const chatRoutes = new Hono()
  .post('/messages', async(c) => {
      const body = await c.req.json()

    const chatService = new ChatService()

    const result = await chatService.sendMessage({
      conversationId: body.conversationId,
      message: body.message
    })

    return c.json(result)
  })