import type { Project, ProjectModelType } from '@/types/projectTypes.js';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectFiles,
  uploadFilesToProject,
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

export const deleteProjectService = async (projectID: string): Promise<ProjectModelType> => {
  const result = await deleteProject(projectID);
  return result;
};

export const getProjectFilesService = async (projectID: string): Promise<ProjectModelType> => {
  const result = await getProjectFiles(projectID);
  return result;
};
import fs from 'fs/promises';
import path from 'path';

export const uploadFilesToProjectService = async (
  projectID: string,
  files: Express.Multer.File[],
): Promise<ProjectModelType> => {
  const uploadedFiles = [];
  const filesDir = path.join(process.cwd(), 'files');
  const result = {
    success: false,
    message: '',
    project_id: projectID,
    files: [],
  };

  fs.mkdir(filesDir, { recursive: true });

  for (const file of files) {
    const filekey = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const extension = path.extname(file.originalname);

    const filename = `${filekey}${extension}`;

    const uploadPath = path.join(process.cwd(), 'files', filename);

    await fs.writeFile(uploadPath, file.buffer);

    const dbResult = await uploadFilesToProject(
      projectID,
      file.originalname,
      filename,
      file.mimetype,
      file.size,
    );

    uploadedFiles.push({
      fileId: dbResult.files.projectfileid,
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      cdt: dbResult.files.cdt,
    });
  }

  result.success = true;
  result.message = 'Files uploaded successfully';
  result.project_id = projectID;
  result.files = uploadedFiles;

  return result;
};
