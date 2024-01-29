import { listDocs, setDoc, getDoc, Doc } from "@junobuild/core";
import BaseRepository from "./BaseRepository";
import projects from 'dummy/projects.json'
import { nanoid } from 'nanoid'
import Project from "entities/project/Project";


class ProjectRepository extends BaseRepository {
  async getProjects(): Promise<Doc<Project>[]> {
    const { items } = await listDocs<Project>({
      collection: "Project",
    });
    return items || [];
  }

  async getProject(
    projectId: string
  ): Promise<Doc<Project> | null> {
    const item = await getDoc<Project>({
      collection: "Project",
      key: projectId
    });
    console.log(projectId);
    console.log(item);

    return item || null;
  }

  async addDummyProject(): Promise<void> {
    const key: string = nanoid();
    setDoc({
      collection: "Project",
      doc: {
        key,
        data: projects[3]
      }
    });
  }
}

export default ProjectRepository