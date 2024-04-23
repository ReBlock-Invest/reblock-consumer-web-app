import Project from "entities/project/Project"
import ProjectICActorRepository from "repositories/ProjectICActorRepository"
import RBFactoryICActorRepository from "repositories/RBFactoryICActorRepository"
import RBPoolICActorRepository from "repositories/RBPoolICActorRepository"

export default class ProjectService {

  private projectICActorRepositoryRegistry: Record<string, ProjectICActorRepository>
  private rbPollICActorRepository: RBPoolICActorRepository
  private rbFactoryICActorRepository: RBFactoryICActorRepository

  constructor(
    projectICActorRepositoryRegistry: Record<string, ProjectICActorRepository>,
    rbPollICActorRepository: RBPoolICActorRepository,
    rbFactoryICActorRepository: RBFactoryICActorRepository
  ) {
    this.projectICActorRepositoryRegistry = projectICActorRepositoryRegistry
    this.rbPollICActorRepository = rbPollICActorRepository
    this.rbFactoryICActorRepository = rbFactoryICActorRepository
  }

  async getProjects(
    start: number,
    limit: number
  ): Promise<Project[]> {
    return this.rbFactoryICActorRepository.getPools(
      start,
      limit
    )
  }

  async getProject(
    projectId: string
  ): Promise<Project | undefined> {
    const projects = await this.getProjects(0, 99)

    return projects.find((project) => (project.id as string) === projectId)
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
    amount: BigInt
  ) {
    const projectICActorRepository = this.projectICActorRepositoryRegistry[
      projectId
    ]

    await projectICActorRepository.approve(
      this.rbPollICActorRepository.getPoolPrincipal(),
      amount
    )

    await this.rbPollICActorRepository.deposit(
      amount
    )
  }

  async repayInterest(
    projectId: string,
    amount: BigInt
  ) {
    const projectICActorRepository = this.projectICActorRepositoryRegistry[
      projectId
    ]

    await projectICActorRepository.approve(
      this.rbPollICActorRepository.getPoolPrincipal(),
      amount
    )

    await this.rbPollICActorRepository.repayInterest(
      amount
    )
  }

  async repayPrincipal(
    projectId: string,
    amount: BigInt
  ) {
    const dummyUSDCICActorRepository = this.projectICActorRepositoryRegistry[
      projectId
    ]

    await dummyUSDCICActorRepository.approve(
      this.rbPollICActorRepository.getPoolPrincipal(),
      amount
    )

    await this.rbPollICActorRepository.repayPrincipal(
      amount
    )
  }

  async drawdownAsset(
    amount: BigInt
  ) {
    await this.rbPollICActorRepository.drawdown(
      amount
    )
  }

  async withdraw(
    amount: BigInt
  ) {
    await this.rbPollICActorRepository.withdraw(
      amount
    )
  }
}