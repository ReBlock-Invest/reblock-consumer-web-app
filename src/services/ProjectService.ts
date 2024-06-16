import Project from "entities/project/Project"
import ProjectWithBalance from "entities/project/ProjectWithBalance"
import { Principal } from "@dfinity/principal"
import CKUSDCActorRepository from "repositories/CKUSDCActorRepository"
import RBFactoryICActorRepository from "repositories/RBFactoryICActorRepository"
import RBPoolICActorRepository from "repositories/RBPoolICActorRepository"

export default class ProjectService {

  private ckUSDCActorRepository: CKUSDCActorRepository
  private rbPoolICActorRepository: RBPoolICActorRepository
  private rbFactoryICActorRepository: RBFactoryICActorRepository

  constructor(
    ckUSDCActorRepository: CKUSDCActorRepository,
    rbPollICActorRepository: RBPoolICActorRepository,
    rbFactoryICActorRepository: RBFactoryICActorRepository
  ) {
    this.ckUSDCActorRepository = ckUSDCActorRepository
    this.rbPoolICActorRepository = rbPollICActorRepository
    this.rbFactoryICActorRepository = rbFactoryICActorRepository
  }

  async getProjects(
    start: number,
    limit: number
  ): Promise<Project[]> {
    return await this.rbFactoryICActorRepository.getPools(
      start,
      limit
    )
  }

  async getProjectsWithBalance(
    start: number,
    limit: number
  ): Promise<ProjectWithBalance[]> {
    return await this.rbFactoryICActorRepository.getPoolsWithBalance(
      start,
      limit
    )
  }

  async getProject(
    projectId: string
  ): Promise<Project | undefined> {
    const projects = await this.getProjects(0, 99)
    return projects.find((project) => project.canister_id === projectId)
  }

  async createProject(
    project: Project
  ): Promise<void> {
    await this.rbFactoryICActorRepository.proposePool(
      project
    )
  }

  async depositToRBPoolPrincipal(
    projectId: string,
    amount: bigint
  ) {
    console.log("depo1", projectId , ":", Number(amount))
    let result = await this.ckUSDCActorRepository.approve(
      Principal.fromText(projectId),
      amount
    )

    let resultObj = result as { Err: any, Ok: any}
    console.log("err", resultObj)
    if (!!resultObj.Err) {
      throw new Error("Approval failed")
    }
  
    let result2 = await this.rbPoolICActorRepository.deposit(projectId, amount)
    console.log("res", result2)
  }

  async repayInterest(
    projectId: string,
    amount: bigint
  ) {

    await this.ckUSDCActorRepository.approve(
      Principal.fromText(projectId),
      amount
    )

    await this.rbPoolICActorRepository.repayInterest(projectId)
  }

  async repayPrincipal(
    projectId: string,
    amount: bigint
  ) {

    await this.ckUSDCActorRepository.approve(
      Principal.fromText(projectId),
      amount
    )

    await this.rbPoolICActorRepository.repayPrincipal(projectId)
  }

  async drawdownAsset(
    poolId: string,
  ) {
    await this.rbPoolICActorRepository.drawdown(poolId)
  }

  async withdraw(
    poolId: string,
    amount: BigInt
  ) {
    await this.rbPoolICActorRepository.withdraw(poolId, amount)
  }

  async getPoolBalance(
    poolId: string,
    userPrincipal: string
  ): Promise<bigint> {
    return await this.rbPoolICActorRepository.getPoolBalance(poolId, Principal.fromText(userPrincipal))
  }

  async getCkUSDCBalance(
    assetPrincipal: string
  ): Promise<bigint> {
    return await this.ckUSDCActorRepository.getBalance(Principal.fromText(assetPrincipal))
  }
}