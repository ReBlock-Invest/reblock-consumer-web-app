import { Actor } from "@dfinity/agent"
import ICActor from "../lib/web3/actors/ICActor"
import Transaction from "entities/transaction/Transaction"
import { Principal } from "@dfinity/principal"
import TransactionOperationEnum from "entities/transaction/TransactionOperationEnum"
import TransactionStatusEnum from "entities/transaction/TransactionStatusEnum"
import { createActor as makePoolActor } from "entities/pool"

type PoolTransaction = {
  amount: BigInt
  fee: BigInt
  index: BigInt
  from: Principal
  to: Principal
  timestamp: BigInt
  op: {
    init?: null
    deposit?: null
    drawdown?: null
    repayPrincipal?: null
    withdraw?: null
  }
  status: {
    succeeded?: null
    failed?: null
  }
}

interface RBPoolICActorInterface {
  icrc1_total_supply(): Promise<BigInt>
  icrc1_balance_of(userPrincipal: Principal): Promise<BigInt>
  get_borrower(): Promise<string>
  deposit(amount: BigInt): Promise<void>
  repay_principal(amount: BigInt): Promise<void>
  repay_interest(amount: BigInt): Promise<void>
  withdraw(amount: BigInt): Promise<void>
  drawdown(amount: BigInt): Promise<void>
  get_pool_transactions(start: number, limit: number): Promise<PoolTransaction[]>
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
    poolId: string,
    start: number,
    limit: number
  ): Promise<Transaction[]> {

    let bstart: bigint = BigInt(start)
    let blimit: bigint = BigInt(limit)

    let pool = makePoolActor(poolId)
    let result = await pool.get_pool_transactions(bstart, blimit)
    
    const transactions = result as PoolTransaction[];
    //console.log(result);
    return transactions.map((transaction) => ({
      amount: Number(transaction.amount),
      op: this.mapTransactionOperation(transaction),
      status: this.mapTransactionStatus(transaction),
      from: transaction.from.toString(),
      to: transaction.to.toString(),
      caller: '',
      fee: Number(transaction.fee),
      index: Number(transaction.index),
      timestamp: Number(transaction.timestamp) / 1000000
    }))
  }

  private mapTransactionOperation(transaction: PoolTransaction): TransactionOperationEnum {
    if (transaction.op.deposit === null) return TransactionOperationEnum.DEPOSIT
    if (transaction.op.drawdown === null) return TransactionOperationEnum.DRAWDOWN
    if (transaction.op.init === null) return TransactionOperationEnum.INIT
    if (transaction.op.repayPrincipal === null) return TransactionOperationEnum.REPAY_PRINCIPAL
    if (transaction.op.withdraw === null) return TransactionOperationEnum.WITHDRAW
    return TransactionOperationEnum.WITHDRAW
  }

  private mapTransactionStatus(transaction: PoolTransaction): TransactionStatusEnum {
    if (transaction.status.failed === null) return TransactionStatusEnum.FAILED
    if (transaction.status.succeeded === null) return TransactionStatusEnum.SUCCEEDED
    return TransactionStatusEnum.FAILED
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

  async getUserTotalSupply(
    userPrincipal: Principal
  ) {
    const actor = await this.getActor()
    return actor.icrc1_balance_of(userPrincipal)
  }

  async getTotalSupply() {
    const actor = await this.getActor()
    return actor.icrc1_total_supply()
  }

  getPoolPrincipal() {
    return Principal.from('m3fyl-yqaaa-aaaal-ad73a-cai')
  }
}