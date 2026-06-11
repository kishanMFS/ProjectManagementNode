import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '@/controllers/projectController.js';

import authMiddleware from '@/middleware/authMiddleware.js';

const router: Router = Router();

router.post('/createProject', authMiddleware, createProject);
router.get('/getProjects', authMiddleware, getProjects);
router.get('/getProjectById/:id', authMiddleware, getProjectById);
router.put('/updateProject/:id', authMiddleware, updateProject);
router.delete('/deleteProject/:id', authMiddleware, deleteProject);

export default router;
