import { Actor } from "@dfinity/agent"
import ICActor from "../lib/web3/actors/ICActor"
import Project from "entities/project/Project"
import { Principal } from "@dfinity/principal"

interface RBFactoryICActorInterface {
  get_pools(
    start: number,
    limit: number
  ): Promise<Project[]>
  proposePool(
    project: Project
  ): Promise<string>
}

interface RBFactoryICActorExtensionInterface extends RBFactoryICActorInterface, Actor {}

export default class RBFactoryICActorRepository extends ICActor<RBFactoryICActorExtensionInterface>  {
  async getPools(
    start: number,
    limit: number
  ) {
    const actor = await this.getActor()
    const pools = await actor.get_pools(
      start,
      limit
    )

    return pools.map((pool) => ({
      ...pool,
      id: (pool.id as Principal).toText(),
      fundrise_end_time: Number(pool.fundrise_end_time as BigInt),
      maturity_date: Number(pool.maturity_date as BigInt),
      origination_date: Number(pool.origination_date as BigInt),
    }))
  }

  async proposePool(
    project: Project
  ) {
    const actor = await this.getActor()
    return actor.proposePool(
      project
    )
  }
}