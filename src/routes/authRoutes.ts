import express from 'express';
import type { Router } from 'express';
import { loginController } from '@/controllers/authController.js';

const router: Router = express.Router();

router.post('/login', loginController);

export default router;
