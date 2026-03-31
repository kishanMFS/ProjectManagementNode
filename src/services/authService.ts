import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import type { User } from '@/types/authServiceTypes.js';
import { findUserByEmail } from '@/models/authModel.js';
import env from '@/config/env.js';

const JWT_SECRET = env.JWT_SECRET;

export const loginUser = async (
  emailId: string,
  password: string,
): Promise<{ access_token: string }> => {
  const user = await findUserByEmail(emailId);

  if (!user) {
    return { access_token: '' };
  }
  // bcrypt.hash('admin123', 10)
  // password was created using bcrypt with salt rounds of 10, so we need to compare the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { access_token: '' };
  }

  const token = jwt.sign({ id: user.user_id, emailId: user.email_id }, JWT_SECRET, {
    expiresIn: '2h',
  });

  return { access_token: token };
};
