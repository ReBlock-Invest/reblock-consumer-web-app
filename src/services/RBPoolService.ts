import { Principal } from "@dfinity/principal";
import RBPoolICActorRepository from "repositories/RBPoolICActorRepository";

export default class RBPoolService {
  private rbPoolICActorRepository: RBPoolICActorRepository;

  constructor(
    rbPoolICActorRepository: RBPoolICActorRepository
  ) {
    this.rbPoolICActorRepository = rbPoolICActorRepository
  }

  async getBorrowerAddress() {
    const borrowerAdrress = await this.rbPoolICActorRepository.getBorrower()
    return borrowerAdrress
  }

  async getTotalSupply() {
    const totalSupply = await this.rbPoolICActorRepository.getTotalSupply()
    return totalSupply
  }

  async drawdown(
    poolId: string
  ) {
    await this.rbPoolICActorRepository.drawdown(poolId)
  }

  async withdraw(
    poolId: string,
    amount: bigint
  ) {
    await this.rbPoolICActorRepository.withdraw(poolId, amount)
  }

  async getPoolTransactions(
    poolId: string,
    start: number,
    limit: number,
  ) {
    return this.rbPoolICActorRepository.getPoolTransactions(
      poolId,
      start,
      limit
    )
  }

  async getUserTransactions(
    userPrincipal: string,
    start: number,
    limit: number,
  ) {
    return this.rbPoolICActorRepository.getUserTransactions(
      userPrincipal,
      start,
      limit
    )
  }

  async getUserTotalSupply(
    userPrincipal: Principal | undefined,
  ) {
    if (!userPrincipal) return 0
    
    return this.rbPoolICActorRepository.getUserTotalSupply(
      userPrincipal
    )
  }

  async getUserPoolToken(
    poolId: string,
    userPrincipal: string,
  ) {
    return await this.rbPoolICActorRepository.getUserPoolToken(
      poolId,
      Principal.fromText(userPrincipal)
    )
  }

  async getTokenSymbol(
    poolId: string
  ) {
    return await this.rbPoolICActorRepository.getTokenSymbol(poolId)
  }

  async getNextRepayments(
    poolId: string,
  ) {
    const principal = await this.rbPoolICActorRepository.nextPrincipalRepayment(Principal.fromText(poolId))
    const interest = await this.rbPoolICActorRepository.nextInterestRepayment(Principal.fromText(poolId))

    return { principal: principal, interest: interest }
  }
}