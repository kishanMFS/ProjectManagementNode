import { loginController } from '../src/controllers/authController.js';
import * as authService from '../src/services/authService.js';
import { loginUser } from '../src/services/authService.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { Request, Response } from 'express';
import type { loginBody } from '../src/types/authServiceTypes.js';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your_jwt_secret';

describe('loginUser service', () => {
  //   afterEach(() => {
  //     jest.restoreAllMocks();
  //   });

  it('should return a token for valid credentials', async () => {
    const result = await loginUser('john@mail.com', 'changeme');
    interface MyJwtPayload extends JwtPayload {
      id: string;
      emailId: string;
    }
    expect(result.access_token).not.toBe('');
    const decoded = jwt.verify(result.access_token, JWT_SECRET) as unknown as MyJwtPayload;

    expect(decoded.emailId).toBe('john@mail.com');
    // expect(decoded.id).toBe("1");
  });

  it('should return empty token for invalid email', async () => {
    const result = await loginUser('unknown', 'admin123');
    expect(result.access_token).toBe('');
  });

  it('should return empty token for invalid password', async () => {
    const result = await loginUser('admin', 'wrongpassword');
    expect(result.access_token).toBe('');
  });
});

describe('Auth Controller - loginUser', () => {
  let mockReq: Partial<Request<loginBody>>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return 400 if username or password is missing', async () => {
    await loginController(mockReq as Request<loginBody>, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Email and password are required',
    });
  });

  it('should return 200 and token for valid credentials', async () => {
    mockReq.body = { emailId: 'john@mail.com', password: 'changeme' };
    jest.spyOn(authService, 'loginUser').mockResolvedValue({
      access_token: 'fake.jwt.token',
    } as { access_token: string });

    await loginController(mockReq as Request<loginBody>, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      access_token: 'fake.jwt.token',
    });
  });

  it('should return 401 for invalid credentials', async () => {
    mockReq.body = { emailId: 'john@mail.com', password: 'wrong' };
    jest.spyOn(authService, 'loginUser').mockResolvedValue({
      access_token: '',
    });

    await loginController(mockReq as Request<loginBody>, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Invalid credentials',
    });
  });
});
