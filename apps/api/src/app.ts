import { Hono } from 'hono'
import { chatRoutes } from './routes/chat.js'

export const app = new Hono()
app.route('/chat', chatRoutes)

export type AppType = typeof app