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
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { access_token: '' };
  }

  const token = jwt.sign({ id: user.user_id, emailId: user.email_id }, JWT_SECRET, {
    expiresIn: '2h',
  });

  return { access_token: token };
};

// Mock function to find user by username
// const findUserByUsername = async (username: string): Promise<User | null> => {
//   const users: User[] = [
//     { id: '1', username: 'admin', password: await bcrypt.hash('admin123', 10) },
//     { id: '2', username: 'john@mail.com', password: await bcrypt.hash('changeme', 10) },
//   ];
//   return users.find((user) => user.username === username) || null;
// };
