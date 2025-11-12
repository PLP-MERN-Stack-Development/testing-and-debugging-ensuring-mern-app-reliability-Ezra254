import { validateEmail, validatePassword, validateUsername } from '../../utils/validate';

describe('validate utility functions', () => {
  describe('validateEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('test+tag@example.com')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('test@.com')).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('returns true for valid passwords', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('MyPass123')).toBe(true);
      expect(validatePassword('12345678a')).toBe(true);
    });

    it('returns false for passwords without letters', () => {
      expect(validatePassword('12345678')).toBe(false);
    });

    it('returns false for passwords without numbers', () => {
      expect(validatePassword('abcdefgh')).toBe(false);
    });

    it('returns false for passwords shorter than 8 characters', () => {
      expect(validatePassword('pass1')).toBe(false);
      expect(validatePassword('abc123')).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(validatePassword(null)).toBe(false);
      expect(validatePassword(undefined)).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('validateUsername', () => {
    it('returns true for valid usernames', () => {
      expect(validateUsername('user123')).toBe(true);
      expect(validateUsername('testuser')).toBe(true);
      expect(validateUsername('User123')).toBe(true);
      expect(validateUsername('abc')).toBe(true);
      expect(validateUsername('12345678901234567890')).toBe(true);
    });

    it('returns false for usernames shorter than 3 characters', () => {
      expect(validateUsername('ab')).toBe(false);
      expect(validateUsername('a')).toBe(false);
    });

    it('returns false for usernames longer than 20 characters', () => {
      expect(validateUsername('123456789012345678901')).toBe(false);
    });

    it('returns false for usernames with special characters', () => {
      expect(validateUsername('user-name')).toBe(false);
      expect(validateUsername('user_name')).toBe(false);
      expect(validateUsername('user.name')).toBe(false);
      expect(validateUsername('user name')).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(validateUsername(null)).toBe(false);
      expect(validateUsername(undefined)).toBe(false);
      expect(validateUsername('')).toBe(false);
    });
  });
});






