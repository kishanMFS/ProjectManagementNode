import { Router } from 'express';
import {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjects,
  uploadFilesToProject,
  getProjectFiles,
  deleteProjectFiles,
  createZip,
  getJobStatus,
  downloadZip,
} from '@/controllers/projectController.js';

import authMiddleware from '@/middleware/authMiddleware.js';

const router: Router = Router();

router.post('/', authMiddleware, createProject); // create project
router.get('/:projectID', authMiddleware, getProjectById); // get particular project details
router.put('/:projectID', authMiddleware, updateProject); // update specific project
router.delete('/:projectID', authMiddleware, deleteProject); // delete project
router.get('/', authMiddleware, getProjects); // get all projects

router.post('/:projectID/files', authMiddleware, uploadFilesToProject); // upload files to project
router.get('/:projectID/files', authMiddleware, getProjectFiles); // list project files
router.delete('/:projectID/files/:fileID', authMiddleware, deleteProjectFiles); // delete project files
router.post('/:projectID/jobs/zip', authMiddleware, createZip); // create zip
router.get('/:projectID/jobs/:jobID', authMiddleware, getJobStatus); // get Job status
router.get('/:projectID/files/:fileName/download', authMiddleware, downloadZip); // download Zip file

export default router;
