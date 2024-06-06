import { Actor } from "@dfinity/agent"
import ICActor from "../lib/web3/actors/ICActor"
import Project from "entities/project/Project"
import Pool from "entities/factory/Pool"
import ProjectCreditRatingEnum from "entities/project/ProjectCreditRatingEnum"
import PaymentFrequencyEnum from "entities/project/PaymentFrequencyEnum"
import ProjectStatusEnum from "entities/project/ProjectStatusEnum"
import { createActor as makeFactoryActor } from "entities/factory"

interface RBFactoryICActorInterface {
  get_pools(
    start: number,
    limit: number
  ): Promise<Pool[]>
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

    let bstart: bigint = BigInt(start)
    let blimit: bigint = BigInt(limit)

    let factory = makeFactoryActor(process.env.REACT_APP_RB_POOL_FACTORY_CANISTER_ID)
    let result = await factory.get_pools([], bstart, blimit)
    
    const pools = result as Pool[]

    return pools.map((pool) => ({
      id: pool.id,
      APR: pool.apr,
      credit_rating: pool.credit_rating as ProjectCreditRatingEnum,
      description: pool.description,
      fundrise_end_time: pool.fundrise_end_time,
      issuer_description: pool.issuer_description,
      issuer_picture: pool.issuer_picture,
      loan_term: pool.loan_term,
      maturity_date: pool.maturity_date,
      origination_date: pool.origination_date,
      payment_frequency: pool.payment_frequency as PaymentFrequencyEnum,
      secured_by: pool.secured_by,
      smart_contract_url: pool.smart_contract_url,
      borrowers: pool.borrowers,
      status: pool.status as ProjectStatusEnum,
      title: pool.title,
      total_loan_amount: pool.total_loan_amount,
      canister_id: pool.id.toString(),
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