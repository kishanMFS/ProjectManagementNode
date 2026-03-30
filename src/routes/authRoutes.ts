import express from 'express';
import type { Router } from 'express';
import { loginUser } from '../controllers/authController.js';

const router: Router = express.Router();

router.post('/login', loginUser);

export default router;
