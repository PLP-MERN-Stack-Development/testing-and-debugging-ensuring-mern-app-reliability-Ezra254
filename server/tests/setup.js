// Global test setup for server-side tests
// This file runs before each test file

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
process.env.MONGOMS_VERSION = '5.0.5'; // Smaller MongoDB binary for faster in-memory downloads on CI/Windows

// Increase timeout for async operations (MongoDB binaries may take time to download on first run)
jest.setTimeout(300000);






