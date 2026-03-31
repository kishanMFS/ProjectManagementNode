import type { Project, ProjectModelType } from '@/types/projectTypes.js';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '@/models/projectModel.js';

export const createProjectService = async (projectData: Project): Promise<ProjectModelType> => {
  const result = await createProject(projectData);
  return result;
};

export const getProjectsService = async (): Promise<ProjectModelType> => {
  const result = await getProjects();
  return result;
};

export const getProjectByIdService = async (id: string): Promise<ProjectModelType> => {
  const result = await getProjectById(id);
  return result;
};

export const updateProjectService = async (
  id: string,
  projectData: Project,
): Promise<ProjectModelType> => {
  const result = await updateProject(id, projectData);
  return result;
};

export const deleteProjectService = async (id: string): Promise<ProjectModelType> => {
  const result = await deleteProject(id);
  return result;
};
