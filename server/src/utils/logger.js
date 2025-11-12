const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Custom log format
const logFormat = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');
};

// Create write stream for access logs
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// Console logger
const consoleLogger = morgan('dev');

// File logger
const fileLogger = morgan(logFormat, { stream: accessLogStream });

// Custom logger for errors
const errorLogger = (error, req = null) => {
  const timestamp = new Date().toISOString();
  const errorLog = {
    timestamp,
    error: {
      message: error.message,
      stack: error.stack,
      ...(req && {
        method: req.method,
        url: req.url,
        ip: req.ip,
      }),
    },
  };

  // Log to console
  console.error('[ERROR]', errorLog);

  // Log to file
  const errorLogPath = path.join(logsDir, 'error.log');
  fs.appendFileSync(
    errorLogPath,
    JSON.stringify(errorLog) + '\n'
  );
};

module.exports = {
  consoleLogger,
  fileLogger,
  errorLogger,
};






