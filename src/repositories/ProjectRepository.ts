import BaseRepository from "./BaseRepository";
import project from 'dummy/project.json'

class ProjectRepository extends BaseRepository {
  async getProjects() {
    return [
      project,
      project,
      project,
    ]
  }

  async getProject(
    projectId: string
  ) {
    return project
  }
}

export default ProjectRepository