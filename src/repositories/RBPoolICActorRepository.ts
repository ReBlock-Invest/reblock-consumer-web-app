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
    poolId: string,
    amount: BigInt
  ) {
    const pool = await makePoolActor(poolId)
    return await pool.deposit(amount)
  }

  async repayPrincipal(
    poolId: string
  ) {
    const pool = await makePoolActor(poolId)
    const result = await pool.repay_principal()
    return result
  }

  async repayInterest(
    poolId: string
  ) {
    const pool = await makePoolActor(poolId)
    const result = await pool.repay_interest()
    return result
  }

  async withdraw(
    poolId: string,
    amount: BigInt
  ) {
    const pool = await makePoolActor(poolId)
    return await pool.withdraw(amount)
  }

  async drawdown(
    poolId: string
  ) {
    const pool = await makePoolActor(poolId)
    const result = await pool.drawdown()
    return result
  }

  async getPoolTransactions(
    poolId: string,
    start: number,
    limit: number
  ): Promise<Transaction[]> {

    let bstart: bigint = BigInt(start)
    let blimit: bigint = BigInt(limit)

    let pool = await makePoolActor(poolId, 'query')
    let result = await pool.get_pool_transactions(bstart, blimit)
    
    const transactions = result as PoolTransaction[];

    return transactions.map((transaction) => ({
      amount: transaction.amount as bigint,
      op: this.mapTransactionOperation(transaction),
      status: this.mapTransactionStatus(transaction),
      from: transaction.from.toString(),
      to: transaction.to.toString(),
      caller: '',
      fee: transaction.fee as bigint,
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
    poolId: string,
    user_principal: string,
    start: number,
    limit: number
  ) {

    let bstart: bigint = BigInt(start)
    let blimit: bigint = BigInt(limit)

    let pool = await makePoolActor(poolId, 'query')
    let result = await pool.get_user_transactions(Principal.from(user_principal), bstart, blimit)
    
    const transactions = result as PoolTransaction[];

    return transactions.map((transaction) => ({
      amount: transaction.amount as bigint,
      op: this.mapTransactionOperation(transaction),
      status: this.mapTransactionStatus(transaction),
      from: transaction.from.toString(),
      to: transaction.to.toString(),
      caller: '',
      fee: transaction.fee as bigint,
      index: Number(transaction.index),
      timestamp: Number(transaction.timestamp) / 1000000
    }))
  }

  async getUserTotalSupply(
    userPrincipal: Principal
  ) {
    const actor = await this.getActor()
    return actor.icrc1_balance_of(userPrincipal)
  }

  async getPoolBalance(
    poolId: string,
    userPrincipal: Principal
  ) {
    const actor = await makePoolActor(poolId, 'query')
    let balance =  await actor.balance_of(userPrincipal)
    return balance as bigint
  }

  async getUserPoolToken(
    poolId: string,
    userPrincipal: Principal
  ) {
    const actor = await makePoolActor(poolId, 'query')
    let balance =  await actor.icrc1_balance_of({ owner: userPrincipal, subaccount: [] })
    return balance as bigint
  }

  async nextPrincipalRepayment(
    poolId: Principal
  ) {
    const pool = await makePoolActor(poolId, 'query')
    let amount =  await pool.next_principal_repayment()

    return amount as bigint
  }

  async nextInterestRepayment(
    poolId: Principal
  ) {
    const pool = await makePoolActor(poolId, 'query')
    let amount =  await pool.next_interest_repayment()

    return amount as bigint
  }

  async nextPrincipalRepaymentDeadline(
    poolId: Principal
  ) {
    const pool = await makePoolActor(poolId, 'query')
    let timestamp =  await pool.next_principal_repayment_deadline()

    return Number(timestamp) / 1000
  }

  async nextInterestRepaymentDeadline(
    poolId: Principal
  ) {
    const pool = await makePoolActor(poolId, 'query')
    let timestamp =  await pool.next_interest_repayment_deadline()

    return Number(timestamp) / 1000
  }

  async getTokenSymbol(
    poolId: string
  ) {
    const pool = await makePoolActor(poolId, 'query')

    return await pool.icrc1_symbol()
  }

  async getOriginatedLoan(
    poolId: string
  ) {
    const pool = await makePoolActor(poolId, 'query')

    return await pool.get_total_fund()
  }

  async getOutstandingLoan(
    poolId: string
  ) {
    const pool = await makePoolActor(poolId, 'query')

    return await pool.get_outstanding_loan()
  }

  async getTotalSupply() {
    const actor = await this.getActor()
    return actor.icrc1_total_supply()
  }

  getPoolPrincipal() {
    return Principal.from('m3fyl-yqaaa-aaaal-ad73a-cai')
  }
}