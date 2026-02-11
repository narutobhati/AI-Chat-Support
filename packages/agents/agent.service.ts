import type { ConversationContext } from '@repo/services'
import { SupportAgent } from '@repo/agents'
import { OrderAgent } from './order.agent.js'
import { BillingAgent } from './billing.agent.js'
import type { AgentType } from './types.js'

export class AgentService {
  private supportAgent = new SupportAgent()
  private orderAgent = new OrderAgent()
  private billingAgent = new BillingAgent()

  async handle(
    agent: AgentType,
    message: string,
    context: ConversationContext
  ) {
    switch (agent) {
      case 'order':
        return this.orderAgent.handle({ message, context })
      case 'billing':
        return this.billingAgent.handle({ message, context })
      case 'support':
      default:
        return this.supportAgent.handle({ message, context })
    }
  }
}
