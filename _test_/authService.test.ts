import { loginController } from '../src/controllers/authController.js';
import * as authService from '../src/services/authService.js';
import { loginUser } from '../src/services/authService.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { Request, Response } from 'express';
import type { loginBody } from '../src/types/authServiceTypes.js';
import type { LoginResult } from '../src/types/authServiceTypes.ts';

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
    expect(result).not.toBeNull();
    if (!result) throw new Error('Expected loginUser to return a token');
    const decoded = jwt.verify(result.access_token, JWT_SECRET) as unknown as MyJwtPayload;

    expect(decoded.emailId).toBe('john@mail.com');
    // expect(decoded.id).toBe("1");
  });

  it('should return null on invalid email', async () => {
    const result = await loginUser('unknown', 'admin123');
    // expect(result).not.toBeNull();

    // if (!result) throw new Error('Expected result but got null');

    expect(result).toBeNull();
  });

  it('should return null on invalid password', async () => {
    const result = await loginUser('admin', 'wrongpassword');
    expect(result).toBeNull();
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
      cookie: jest.fn(),
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

  type LoginSuccess = Exclude<LoginResult, null>;

  it('should return 200 and token for valid credentials', async () => {
    mockReq.body = { email: 'john@mail.com', password: 'changeme' };
    jest.spyOn(authService, 'loginUser').mockResolvedValue({
      access_token: 'fake.jwt.token',
      cookieOptions: {} as LoginSuccess['cookieOptions'],
    });

    await loginController(mockReq as Request<loginBody>, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      access_token: 'fake.jwt.token',
    });
  });

  it('should return 401 for invalid credentials', async () => {
    mockReq.body = { email: 'john@mail.com', password: 'wrong' };
    jest.spyOn(authService, 'loginUser').mockResolvedValue(null);

    await loginController(mockReq as Request<loginBody>, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Invalid credentials',
    });
  });
});
