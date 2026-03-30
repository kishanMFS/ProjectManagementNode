import express from 'express';
import type { Router } from 'express';
import { loginUser } from '../controllers/authController';

const router: Router = express.Router();

router.post('/login', loginUser);

export default router;
