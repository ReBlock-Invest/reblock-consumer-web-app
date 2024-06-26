import { Actor } from "@dfinity/agent"
import { Principal } from "@dfinity/principal";
import ICActor from "../lib/web3/actors/ICActor"
import Project from "entities/project/Project"
import Pool from "entities/factory/Pool"
import ProjectCreditRatingEnum from "entities/project/ProjectCreditRatingEnum"
import PaymentFrequencyEnum from "entities/project/PaymentFrequencyEnum"
import ProjectStatusEnum from "entities/project/ProjectStatusEnum"
import { createActor as makeFactoryActor } from "entities/factory"
import { createActor as makeCKUSDCActor } from "entities/icrc"

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

    let factory = await makeFactoryActor(process.env.REACT_APP_RB_POOL_FACTORY_CANISTER_ID, 'query')
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
      status: this.mapPoolStatus(pool),
      title: pool.title,
      total_loan_amount: pool.total_loan_amount,
      canister_id: pool.id.toString(),
    }))
  }

  async getPoolsWithBalance(
    start: number,
    limit: number
  ) {

    let pools = await this.getPools(start, limit)
    let ckusdc = await makeCKUSDCActor(process.env.REACT_APP_CKUSDC_CANISTER_ID, 'query')

    const itemsWithBalance= await Promise.all(
      pools.map(async (pool) => ({
        ...pool,
        balance: Number(await ckusdc.icrc1_balance_of({ owner: Principal.fromText(pool.canister_id), subaccount: []})) / 1000000
      })))
    
    return itemsWithBalance
  }

  async proposePool(
    project: Project
  ) {
    const actor = await this.getActor()
    return actor.proposePool(
      project
    )
  }

  private mapPoolStatus(pool: Pool): ProjectStatusEnum {
    if (pool.status === "closed") return ProjectStatusEnum.CLOSED
    if (pool.status === "active") return ProjectStatusEnum.ACTIVE
    if (pool.status === "pending") return ProjectStatusEnum.PENDING
    if (pool.status === "open") return ProjectStatusEnum.OPEN
    if (pool.status === "default") return ProjectStatusEnum.DEFAULT
    return ProjectStatusEnum.OPEN
  }
}