import { listDocs, setDoc, Doc } from "@junobuild/core";
import BaseRepository from "./BaseRepository";
import projects from 'dummy/projects.json'
import { nanoid } from 'nanoid'
import Project from "entities/project/Project";
import idx from "idx";


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
    const { items } = await listDocs<Project>({
      collection: "Project",
      filter: {
        matcher: {
          key: projectId
        }
      }
    });

    return idx(items, (_) => _[0]) || null;
  }

  async addDummyProject(): Promise<void> {
    const key: string = nanoid();
    setDoc({
      collection: "Project",
      doc: {
        key,
        data: projects[2]
      }
    });
  }
}

export default ProjectRepository