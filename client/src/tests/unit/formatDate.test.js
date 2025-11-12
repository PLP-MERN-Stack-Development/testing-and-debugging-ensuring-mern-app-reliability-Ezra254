import { formatDate, formatRelativeTime } from '../../utils/formatDate';

describe('formatDate utility', () => {
  describe('formatDate', () => {
    it('formats a valid date correctly', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/December 25, 2023/);
    });

    it('handles date string input', () => {
      const formatted = formatDate('2023-12-25');
      expect(formatted).toMatch(/December 25, 2023/);
    });

    it('returns empty string for null input', () => {
      expect(formatDate(null)).toBe('');
    });

    it('returns empty string for undefined input', () => {
      expect(formatDate(undefined)).toBe('');
    });

    it('returns empty string for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('');
    });
  });

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns "just now" for very recent dates', () => {
      const date = new Date(Date.now() - 30000); // 30 seconds ago
      expect(formatRelativeTime(date)).toBe('just now');
    });

    it('returns minutes ago for recent dates', () => {
      const date = new Date(Date.now() - 180000); // 3 minutes ago
      expect(formatRelativeTime(date)).toBe('3 minutes ago');
    });

    it('returns hours ago for dates within 24 hours', () => {
      const date = new Date(Date.now() - 7200000); // 2 hours ago
      expect(formatRelativeTime(date)).toBe('2 hours ago');
    });

    it('returns days ago for dates within a month', () => {
      const date = new Date(Date.now() - 172800000); // 2 days ago
      expect(formatRelativeTime(date)).toBe('2 days ago');
    });

    it('returns formatted date for older dates', () => {
      const date = new Date('2023-01-01');
      jest.setSystemTime(new Date('2023-12-25'));
      const result = formatRelativeTime(date);
      expect(result).toMatch(/January 1, 2023/);
    });

    it('handles null input', () => {
      expect(formatRelativeTime(null)).toBe('');
    });

    it('handles invalid date', () => {
      expect(formatRelativeTime('invalid')).toBe('');
    });
  });
});






