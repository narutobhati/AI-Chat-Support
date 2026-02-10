import React from 'react'
import ReactDOM from 'react-dom/client'
import { rpc } from './lib/rpc'

async function testRpc() {
  const res = await rpc.chat.messages.$post({
    json: {
      conversationId: 'test-convo',
      message: 'hello'
    }
  })

  const data = await res.json()
  console.log(data)
}

testRpc()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <h1>Hono RPC wired</h1>
)
