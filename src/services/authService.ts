import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

type User = {
  id: string;
  username: string;
  password: string;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<{ access_token: string }> => {
  const user = await findUserByUsername(username);

  if (!user) {
    return { access_token: '' };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { access_token: '' };
  }

  const token =
    jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '2h' }) || '';

  return { access_token: token };
};

// Mock function to find user by username
const findUserByUsername = async (username: string): Promise<User | null> => {
  const users: User[] = [
    { id: '1', username: 'admin', password: await bcrypt.hash('admin123', 10) },
    { id: '2', username: 'john@mail.com', password: await bcrypt.hash('changeme', 10) },
  ];
  return users.find((user) => user.username === username) || null;
};
