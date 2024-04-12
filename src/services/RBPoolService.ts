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
    amount: BigInt
  ) {
    await this.rbPoolICActorRepository.drawdown(amount)
  }

  async withdraw(
    amount: BigInt
  ) {
    await this.rbPoolICActorRepository.withdraw(amount)
  }

  async getPoolTransactions(
    start: number,
    limit: number,
  ) {
    return this.rbPoolICActorRepository.getPoolTransactions(
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
}