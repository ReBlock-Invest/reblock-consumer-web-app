import { Actor, ActorConfig, HttpAgent, HttpAgentOptions } from "@dfinity/agent"

export type ICActorOptions = {
  agent?: HttpAgent
  agentOptions?: HttpAgentOptions
  actorOptions?: ActorConfig
}

export default class ICActor<T extends Actor> {
  private actor?: T
  private canisterId: string
  private idlFactory: any

  constructor(canisterId: string, idlFactory: any, options: ICActorOptions = {}) {
    this.canisterId = canisterId
    this.idlFactory = idlFactory
  }

  protected async getActor(): Promise<T> {
    if (this.actor) return this.actor
    //@ts-ignore
    this.actor = await window.ic.plug.createActor({
      canisterId: this.canisterId,
      interfaceFactory: this.idlFactory,
    })    

    return this.actor!!
  }
}