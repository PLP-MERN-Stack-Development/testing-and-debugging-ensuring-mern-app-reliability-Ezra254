const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { consoleLogger, fileLogger } = require('./utils/logger');
const { performanceMonitor } = require('./middleware/performanceMonitor');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(consoleLogger);
  app.use(fileLogger);
  app.use(performanceMonitor);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'MERN Reliability API',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      health: '/health',
    },
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;

