import { listDocs, setDoc, getDoc, Doc } from "@junobuild/core"
import projects from 'dummy/projects.json'
import { nanoid } from 'nanoid'
import Project from "entities/project/Project"
import ProjectICActorRepository from "repositories/ProjectICActorRepository"
import RBPoolICActorRepository from "repositories/RBPoolICActorRepository"

export default class ProjectService {

  private projectICActorRepositoryRegistry: Record<string, ProjectICActorRepository>
  private rbPollICActorRepository: RBPoolICActorRepository

  constructor(
    projectICActorRepositoryRegistry: Record<string, ProjectICActorRepository>,
    rbPollICActorRepository: RBPoolICActorRepository
  ) {
    this.projectICActorRepositoryRegistry = projectICActorRepositoryRegistry
    this.rbPollICActorRepository = rbPollICActorRepository
  }

  async getProjects(): Promise<Doc<Project>[]> {
    const { items } = await listDocs<Project>({
      collection: "Project",
    })
    return items || []
  }

  async getProject(
    projectId: string
  ): Promise<Doc<Project> | null> {
    const item = await getDoc<Project>({
      collection: "Project",
      key: projectId
    })

    return item || null
  }

  async addDummyProject(): Promise<void> {
    const key: string = nanoid()
    setDoc({
      collection: "Project",
      doc: {
        key,
        data: projects[3]
      }
    })
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
    const projectICActorRepository = this.projectICActorRepositoryRegistry[
      projectId
    ]

    await projectICActorRepository.approve(
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