import { Actor, ActorConfig, HttpAgent, HttpAgentOptions } from "@dfinity/agent"

export type ICActorOptions = {
  agent?: HttpAgent
  agentOptions?: HttpAgentOptions
  actorOptions?: ActorConfig
}

export default class ICActor<T extends Actor> {
  private actor: T

  constructor(canisterId: string, idlFactory: any, options: ICActorOptions = {}) {
    const agent = options.agent || new HttpAgent({ ...options.agentOptions })

    this.actor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
      ...options.actorOptions,
    });
  }

  protected getActor(): T {
    return this.actor
  }
}