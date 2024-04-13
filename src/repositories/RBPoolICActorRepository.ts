import { Actor } from "@dfinity/agent"
import ICActor from "../lib/web3/actors/ICActor"
import Transaction from "entities/transaction/Transaction"
import { Principal } from "@dfinity/principal"

interface RBPoolICActorInterface {
  icrc1_total_supply(): Promise<BigInt>
  get_borrower(): Promise<string>
  deposit(amount: BigInt): Promise<void>
  repay_principal(amount: BigInt): Promise<void>
  repay_interest(amount: BigInt): Promise<void>
  withdraw(amount: BigInt): Promise<void>
  drawdown(amount: BigInt): Promise<void>
  get_pool_transactions(start: number, limit: number): Promise<Transaction[]>
  get_user_transactions(user_principal: string, start: number, limit: number): Promise<Transaction[]>
}

interface RBPoolICActorExtensionInterface extends RBPoolICActorInterface, Actor {}

export default class RBPoolICActorRepository extends ICActor<RBPoolICActorExtensionInterface>  {
  async getBorrower(): Promise<string>  {
    const actor = await this.getActor()
    //TODO:
    //- Parse borrower principal to ordinary string.
    return actor.get_borrower()
  }

  async deposit(
    amount: BigInt
  ) {
    const actor = await this.getActor()
    await actor.deposit(amount)
  }

  async repayPrincipal(
    amount: BigInt
  ) {
    const actor = await this.getActor()
    await actor.repay_principal(amount)
  }

  async repayInterest(
    amount: BigInt
  ) {
    const actor = await this.getActor()
    await actor.repay_interest(amount)
  }

  async withdraw(
    amount: BigInt
  ) {
    const actor = await this.getActor()
    await actor.withdraw(amount)
  }

  async drawdown(
    amount: BigInt
  ) {
    const actor = await this.getActor()
    await actor.drawdown(amount)
  }

  async getPoolTransactions(
    start: number,
    limit: number
  ) {
    const actor = await this.getActor()
    return actor.get_pool_transactions(
      start,
      limit
    )
  }

  async getUserTransactions (
    user_principal: string,
    start: number,
    limit: number
  ) {
    const actor = await this.getActor()
    return actor.get_user_transactions(
      user_principal,
      start,
      limit
    )
  }

  async getTotalSupply() {
    const actor = await this.getActor()
    return actor.icrc1_total_supply()
  }

  getPoolPrincipal() {
    return Principal.from('m3fyl-yqaaa-aaaal-ad73a-cai')
  }
}