import type { Request, Response } from 'express';
import * as projectService from '@/services/projectService.js';
import type { Project } from '@/types/projectTypes.js';
import env from '@/config/env.js';

const isProd = env.isProd;

export const createProject = async (req: Request<Project>, res: Response): Promise<void> => {
  try {
    const createProjectResult = await projectService.createProjectService(req.body);
    res.status(201).json(createProjectResult);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const getProjectsResult = await projectService.getProjectsService();

    res.status(200).json(getProjectsResult);
  } catch (error: unknown) {
    let errorMessage = 'Error fetching projects';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: 'Error fetching projects', errorMessage });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const projectId = Array.isArray(id) ? id[0] : id; // Handle case where id might be an array
    const project = await projectService.getProjectByIdService(projectId);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (error: unknown) {
    let errorMessage = 'Error fetching project';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: 'Error fetching project', errorMessage });
  }
};

export const updateProject = async (req: Request<Project>, res: Response): Promise<void> => {
  try {
    const project = await projectService.updateProjectService(req.params.project_id, req.body);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (error: unknown) {
    let errorMessage = 'Error updating project';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: 'Error updating project', errorMessage });
  }
};

export const deleteProject = async (req: Request<Project>, res: Response): Promise<void> => {
  try {
    const project = await projectService.deleteProjectService(req.params.project_id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (error: unknown) {
    let errorMessage = 'Error deleting project';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: 'Error deleting project', errorMessage });
  }
};

export const getProjectFiles = async (req: Request<Project>, res: Response): Promise<void> => {
  try {
    const projectFiles = await projectService.getProjectFilesService(req.params.project_id);
    if (!projectFiles) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(projectFiles);
  } catch (error: unknown) {
    let errorMessage = 'Error getting project files';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: errorMessage, errorMessage });
  }
};

export const uploadFilesToProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.project_id;
    const files = req.files as Express.Multer.File[];

    const projectFiles = await projectService.uploadFilesToProjectService(projectId, files);
    if (!projectFiles.success) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(projectFiles);
  } catch (error: unknown) {
    let errorMessage = 'Error getting project files';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: errorMessage, errorMessage });
  }
};

export const deleteProjectFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.project_id;
    const fileID = req.params.fileID;

    const response = await projectService.deleteProjectFilesService(projectId, fileID);
    if (!response.success) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(response);
  } catch (error: unknown) {
    let errorMessage = 'Error getting project files';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: errorMessage, errorMessage });
  }
};
export const createZip = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.project_id;
    const fileID = req.body.fileId;

    const response = await projectService.createZipService(projectId, fileID);
    if (!response.success) {
      res.status(404).json({ message: 'Project not found', errorMessage: response.message });
      return;
    }
    res.status(200).json(response);
  } catch (error: unknown) {
    let errorMessage = 'Error getting project files';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: errorMessage, errorMessage });
  }
};
export const getJobsStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.project_id;

    const response = await projectService.getJobsStatusService(projectId);
    if (!response.success) {
      res.status(404).json({ message: 'Project jobs not found', errorMessage: response.message });
      return;
    }
    res.status(200).json(response);
  } catch (error: unknown) {
    let errorMessage = 'Error getting project jobs';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: errorMessage, errorMessage });
  }
};

export const downloadZip = async (req: Request, res: Response): Promise<void> => {
  try {
    const { project_id, fileName } = req.params;

    const result = await projectService.downloadZipService(project_id, fileName);

    if (!result.success || !result.filePath) {
      res.status(404).json({
        success: false,
        message: result.message,
      });
      return;
    }

    res.download(result.filePath, result.fileName, (error) => {
      if (error && !res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Failed to download file',
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
