const { generateToken, verifyToken } = require('../../src/utils/auth');

describe('Auth Utility Functions', () => {
  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    email: 'test@example.com',
    role: 'user',
  };

  describe('generateToken', () => {
    it('generates a valid JWT token', () => {
      const token = generateToken(mockUser);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('generates different tokens for different users', () => {
      const user1 = { ...mockUser, _id: '1' };
      const user2 = { ...mockUser, _id: '2' };
      
      const token1 = generateToken(user1);
      const token2 = generateToken(user2);
      
      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('verifies a valid token', () => {
      const token = generateToken(mockUser);
      const decoded = verifyToken(token);
      
      expect(decoded.id).toBe(mockUser._id.toString());
      expect(decoded.email).toBe(mockUser.email);
      expect(decoded.role).toBe(mockUser.role);
    });

    it('throws error for invalid token', () => {
      expect(() => {
        verifyToken('invalid-token');
      }).toThrow('Invalid or expired token');
    });

    it('throws error for expired token', () => {
      // Create an expired token
      const jwt = require('jsonwebtoken');
      const expiredToken = jwt.sign(
        { id: mockUser._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '-1h' } // Expired 1 hour ago
      );

      expect(() => {
        verifyToken(expiredToken);
      }).toThrow('Invalid or expired token');
    });
  });
});






