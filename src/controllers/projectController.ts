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
    const project = await projectService.updateProjectService(req.params.id, req.body);
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
    const project = await projectService.deleteProjectService(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error: unknown) {
    let errorMessage = 'Error deleting project';
    if (!isProd) {
      errorMessage = (error as Error).message;
    }
    res.status(500).json({ message: 'Error deleting project', errorMessage });
  }
};
