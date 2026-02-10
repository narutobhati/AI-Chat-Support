import { Hono } from 'hono'

export const chatRoutes = new Hono()
  .post('/messages', (c) => {
    return c.json({ message: 'stub response' })
  })