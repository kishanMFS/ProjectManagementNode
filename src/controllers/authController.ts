import type { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }
    const token = await authService.loginUser(username, password);
    if (!token) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
