import { Actor } from "@dfinity/agent"
import ICActor from "../lib/web3/actors/ICActor"
import { Principal } from "@dfinity/principal"

interface ProjectICActorInterface {
  approve(source_principal: Principal, amount: BigInt): Promise<void>
}

interface ProjectICActorExtensionInterface extends ProjectICActorInterface, Actor {}

export default class ProjectICActorRepository extends ICActor<ProjectICActorExtensionInterface>  {
  async approve(
    source_principal: Principal,
    amount: BigInt
  ) {
    const actor = await this.getActor()
    await actor.approve(
      source_principal,
      amount
    )
  }
}