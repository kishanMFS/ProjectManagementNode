import {
  createProjectService,
  getProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
  getProjectFilesService,
  deleteProjectFilesService,
  downloadZipService,
} from '../src/services/projectService';

import * as projectModel from '../src/models/projectModel';
import fs from 'fs/promises';
import * as fsSync from 'fs';

jest.mock('@/models/projectModel');
jest.mock('fs/promises');
jest.mock('fs');

describe('projectService test cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProjectService', () => {
    it('should create project', async () => {
      const project = {
        project_name: 'Test Project',
      };

      const expected = {
        success: true,
        project,
      };

      (projectModel.createProject as jest.Mock).mockResolvedValue(expected);

      const result = await createProjectService(project as any);

      expect(projectModel.createProject).toHaveBeenCalledWith(project);
      expect(result).toEqual(expected);
    });
  });

  describe('getProjectsService', () => {
    it('should map model response', async () => {
      const projects = [{ id: '1', name: 'Project test' }];

      (projectModel.getProjects as jest.Mock).mockResolvedValue({
        success: true,
        message: 'Success',
        projects,
      });

      const result = await getProjectsService();

      expect(result).toEqual({
        success: true,
        message: 'Success',
        data: projects,
      });
    });
  });

  describe('deleteProjectService', () => {
    it('should delete project', async () => {
      const response = {
        success: true,
        message: 'Project deleted successfully',
      };

      (projectModel.deleteProject as jest.Mock).mockResolvedValue(response);

      const result = await deleteProjectService('1');

      expect(result).toEqual(response);
    });
  });

  describe('getProjectFilesService', () => {
    it('should map file response', async () => {
      const files = [{ fileId: 1 }];

      (projectModel.getProjectFiles as jest.Mock).mockResolvedValue({
        success: true,
        message: 'Success',
        files,
      });

      const result = await getProjectFilesService('1');

      expect(result).toEqual({
        success: true,
        message: 'Success',
        data: files,
      });
    });
  });

  describe('deleteProjectFilesService', () => {
    it('should delete db record and physical file', async () => {
      (projectModel.deleteProjectFiles as jest.Mock).mockResolvedValue({
        success: true,
        projectfilekey: 'test.txt',
      });

      (fs.unlink as jest.Mock).mockResolvedValue(undefined);

      const result = await deleteProjectFilesService('1', '10');

      expect(projectModel.deleteProjectFiles).toHaveBeenCalledWith('1', '10');
      expect(fs.unlink).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('downloadZipService', () => {
    it('should return file information when zip exists', async () => {
      (fsSync.existsSync as jest.Mock).mockReturnValue(true);

      const result = await downloadZipService('1', 'archive.zip');

      expect(result.success).toBe(true);
      expect(result.fileName).toBe('archive.zip');
      expect(result.filePath).toContain('archive.zip');
    });

    it('should return not found when zip missing', async () => {
      (fsSync.existsSync as jest.Mock).mockReturnValue(false);

      const result = await downloadZipService('1', 'archive.zip');

      expect(result).toEqual({
        success: false,
        message: 'Zip file not found',
      });
    });
  });
});
