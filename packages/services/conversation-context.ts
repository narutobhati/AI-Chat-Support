export type ConversationMessage = {
  role: 'user' | 'agent' | 'system'
  content: string
}

export type ConversationContext = {
  conversationId: string
  summary: string | null
  recentMessages: ConversationMessage[]
}
