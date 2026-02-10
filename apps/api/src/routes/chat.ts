import { Hono } from 'hono'

export const chatRoutes = new Hono()
  .post('/messages', async(c) => {
     const body = await c.req.json()

    return c.json({
      conversationId: body.conversationId,
      reply: 'RPC wired successfully'
    })
  })