import type { Request, Response } from 'express';
import * as projectService from '@/services/projectService.js';
import type { Project } from '@/types/projectTypes.js';

export const createProject = async (req: Request<Project>, res: Response): Promise<void> => {
  try {
    const project: Project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await projectService.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const projectId = Array.isArray(id) ? id[0] : id; // Handle case where id might be an array
    const project: Project | null = await projectService.getProjectById(projectId);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await projectService.deleteProject(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};
