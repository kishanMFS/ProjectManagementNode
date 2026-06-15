import type { Project, ProjectModelType } from '@/types/projectTypes.js';
import fs from 'fs/promises';
import * as fsSync from 'fs';
import path from 'path';
import * as archiver from 'archiver';

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectFiles,
  uploadFilesToProject,
  deleteProjectFiles,
  getProjectFilesByIds,
  createJob,
  getJobsStatus,
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

  await fs.mkdir(filesDir, { recursive: true });

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

export const deleteProjectFilesService = async (
  projectID: string,
  fileID: string,
): Promise<ProjectModelType> => {
  const result = await deleteProjectFiles(projectID, fileID);

  if (result.success) {
    const filePath = path.join(process.cwd(), 'files', result.projectfilekey);
    try {
      await fs.unlink(filePath);
    } catch (error: unknown) {
      result.message = (error as Error).message;
    }
  }

  return result;
};

export const createZipService = async (
  projectID: string,
  fileID: number[],
): Promise<ProjectModelType> => {
  const result = {
    success: false,
    message: '',
  };
  const getProjectFilesByIdsResult = await getProjectFilesByIds(projectID, fileID);
  try {
    if (!getProjectFilesByIdsResult.success) {
      result.success = getProjectFilesByIdsResult.success;
      result.message = getProjectFilesByIdsResult.message;
    }

    const files = getProjectFilesByIdsResult.projectfile ?? [];

    if (!files.length) {
      return {
        success: false,
        message: 'No files found',
      } as ProjectModelType;
    }

    const zipName = `project_${projectID}_${Date.now()}.zip`;
    const zipPath = path.join(process.cwd(), 'files', zipName);

    // create a jon record
    const createJobresult = await createJob(projectID, zipName);

    await new Promise<void>((resolve, reject) => {
      const output = fsSync.createWriteStream(zipPath);

      const archive = new archiver.ZipArchive({
        zlib: { level: 9 },
      });

      output.on('close', () => resolve());

      archive.on('error', reject);

      archive.pipe(output);

      files.forEach((file) => {
        const filePath = path.join(process.cwd(), 'files', file.projectfilekey);

        if (fsSync.existsSync(filePath)) {
          archive.file(filePath, {
            name: file.projectfilename,
          });
        }
      });

      archive.finalize();
    });

    result.success = true;
    result.project_id = projectID;
    result.jobid = createJobresult.jobs.jobid;
    result.status = createJobresult.jobs.status;
    result.message = 'Zip created successfully';
  } catch (error) {
    result.success = false;
    result.message = (error as Error).message;
  }
  return result;
};

export const getJobsStatusService = async (projectID: string): Promise<ProjectModelType> => {
  const result = await getJobsStatus(projectID);
  return result;
};
