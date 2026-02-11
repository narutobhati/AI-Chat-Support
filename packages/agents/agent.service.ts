import type { ConversationContext } from '@repo/services'
import { SupportAgent } from '@repo/agents'
import { OrderAgent } from './order.agent.js'
import { BillingAgent } from './billing.agent.js'
import type { AgentType } from './types.js'

export class AgentService {
  private supportAgent = new SupportAgent()
  private orderAgent = new OrderAgent()
  private billingAgent = new BillingAgent()

  async stream(
    agent: AgentType,
    message: string,
    context: ConversationContext
  ) {
    switch (agent) {
      case 'order':
        return this.orderAgent.stream({ message, context })
      case 'billing':
        return this.billingAgent.stream({ message, context })
      case 'support':
      default:
        return this.supportAgent.stream({ message, context })
    }
  }
}
