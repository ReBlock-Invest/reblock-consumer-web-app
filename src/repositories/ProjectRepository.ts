import { listDocs, setDoc } from "@junobuild/core";
import BaseRepository from "./BaseRepository";
import project from 'dummy/project.json'

// TODO (galih): tolong dibersihin wuekek
class ProjectRepository extends BaseRepository {
  async getProjects() {
    const { items } = await listDocs({
      collection: "Project",
    });
    return items;
  }

  async getProject(
    projectId: string
  ) {
    const { items } = await listDocs({
      collection: "Project",
      filter: {
        matcher: {
          key: projectId
        }
      }
    });

    return items.length == 0 ? null : items[0];
  }
}

export default ProjectRepository