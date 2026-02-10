import { hc } from 'hono/client'
import type { AppType } from '@repo/api'

export const rpc = hc<AppType>('http://localhost:3000')
