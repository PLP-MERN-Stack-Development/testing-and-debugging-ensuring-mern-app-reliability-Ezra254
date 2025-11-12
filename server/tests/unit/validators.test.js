const { isValidEmail, validatePasswordStrength, sanitizeInput } = require('../../src/utils/validators');

describe('Validator Utility Functions', () => {
  describe('isValidEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('test+tag@example.com')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });

    it('returns false for null or undefined', () => {
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(undefined)).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('returns valid for strong passwords', () => {
      const result = validatePasswordStrength('Password123');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('returns errors for short passwords', () => {
      const result = validatePasswordStrength('Pass1');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters');
    });

    it('returns errors for passwords without letters', () => {
      const result = validatePasswordStrength('12345678');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one letter');
    });

    it('returns errors for passwords without numbers', () => {
      const result = validatePasswordStrength('Password');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('returns errors for null or undefined', () => {
      const result = validatePasswordStrength(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password is required');
    });
  });

  describe('sanitizeInput', () => {
    it('trims whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test');
    });

    it('removes HTML-like characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
    });

    it('returns non-string input unchanged', () => {
      expect(sanitizeInput(123)).toBe(123);
      expect(sanitizeInput(null)).toBe(null);
      expect(sanitizeInput(undefined)).toBe(undefined);
    });
  });
});






