import type { Request, Response } from 'express';
import * as authService from '@/services/authService.js';
import type { loginBody } from '@/types/authServiceTypes.js';

export const loginController = async (req: Request<loginBody>, res: Response): Promise<void> => {
  const { emailId, password } = req.body;
  if (emailId === undefined || password === undefined) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  const token = await authService.loginUser(emailId, password);
  if (!token.access_token) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  res.status(200).json(token);
};
