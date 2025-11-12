const { authenticate, authorize } = require('../../src/middleware/auth');
const { generateToken } = require('../../src/utils/auth');
const User = require('../../src/models/User');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Authentication Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      header: jest.fn(),
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(async () => {
    await User.deleteMany({});
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('returns 401 if no token provided', async () => {
      mockReq.header.mockReturnValue(null);

      await authenticate(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'No token provided, authorization denied',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('authenticates user with valid token', async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      const token = generateToken(user);
      mockReq.header.mockReturnValue(`Bearer ${token}`);

      await authenticate(mockReq, mockRes, mockNext);

      expect(mockReq.user).toBeDefined();
      expect(mockReq.user._id.toString()).toBe(user._id.toString());
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('returns 401 for invalid token', async () => {
      mockReq.header.mockReturnValue('Bearer invalid-token');

      await authenticate(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('returns 401 if user not found', async () => {
      const fakeUser = {
        _id: new mongoose.Types.ObjectId(),
        email: 'nonexistent@example.com',
        role: 'user',
      };
      const token = generateToken(fakeUser);
      mockReq.header.mockReturnValue(`Bearer ${token}`);

      await authenticate(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('authorize', () => {
    it('allows access for authorized role', () => {
      mockReq.user = { role: 'admin' };
      const middleware = authorize('admin', 'user');

      middleware(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('denies access for unauthorized role', () => {
      mockReq.user = { role: 'user' };
      const middleware = authorize('admin');

      middleware(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Access denied. Insufficient permissions',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('returns 401 if user not authenticated', () => {
      mockReq.user = null;
      const middleware = authorize('admin');

      middleware(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Authentication required',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});






