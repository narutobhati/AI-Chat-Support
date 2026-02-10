export type AgentType = 'support' | 'order' | 'billing' | 'fallback'

export type RouterResult = {
  agent: AgentType
}
