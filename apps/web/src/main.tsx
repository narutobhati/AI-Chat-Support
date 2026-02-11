import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { rpc } from './lib/rpc.js'

function App() {
  const [messages, setMessages] = useState<
    { role: 'user' | 'agent'; content: string }[]
  >([])
  const [input, setInput] = useState('')
  const conversationId = 'default-convo'

  async function sendMessage() {
    if (!input.trim()) return

    const userMessage = input

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage },
      { role: 'agent', content: '' }
    ])

    setInput('')

    const res = await rpc.chat.messages.$post({
      json: {
        conversationId,
        message: userMessage
      }
    })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()

    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading

      if (value) {
        const chunk = decoder.decode(value)

        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1].content += chunk
          return updated
        })
      }
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>AI Support Chat</h2>

      <div
        style={{
          border: '1px solid #ddd',
          padding: 16,
          height: 400,
          overflowY: 'auto',
          marginBottom: 16
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{m.role === 'user' ? 'You' : 'Agent'}:</strong>
            <div>{m.content}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
