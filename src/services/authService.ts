import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

type User = {
  id: string;
  username: string;
  password: string;
};

export const loginUser = async (username: string, password: string): Promise<{ token: string }> => {
  const user = await findUserByUsername(username);
  if (!user) {
    return { token: '' };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { token: '' };
  }
  const token =
    jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '2h' }) || '';
  return { token };
};

// Mock function to find user by username
const findUserByUsername = async (username: string): Promise<User | null> => {
  const users: User[] = [
    { id: '1', username: 'admin', password: await bcrypt.hash('admin123', 10) },
    { id: '2', username: 'user', password: await bcrypt.hash('user123', 10) },
  ];
  return users.find((user) => user.username === username) || null;
};
