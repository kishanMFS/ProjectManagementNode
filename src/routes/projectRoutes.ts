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
  getJobsStatus,
  downloadZip,
} from '@/controllers/projectController.js';

import authMiddleware from '@/middleware/authMiddleware.js';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router: Router = Router();

router.post('/', authMiddleware, createProject); // create project
router.get('/:project_id', authMiddleware, getProjectById); // get particular project details
router.put('/:project_id', authMiddleware, updateProject); // update specific project
router.delete('/:project_id', authMiddleware, deleteProject); // delete project
router.get('/', authMiddleware, getProjects); // get all projects

router.get('/:project_id/files', authMiddleware, getProjectFiles); // list project files
router.post('/:project_id/files', authMiddleware, upload.array('files'), uploadFilesToProject); // upload files to project
router.delete('/:project_id/files/:fileID', authMiddleware, deleteProjectFiles); // delete project files
router.post('/:project_id/jobs/zip', authMiddleware, createZip); // create zip
// router.get('/:project_id/jobs/:jobID', authMiddleware, getJobStatus); // get Job status
router.get('/:project_id/jobs', authMiddleware, getJobsStatus); // get Jobs status
router.get('/:project_id/files/:fileName/download', authMiddleware, downloadZip); // download Zip file

export default router;
