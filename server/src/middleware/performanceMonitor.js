/**
 * Performance monitoring middleware for Express
 */

/**
 * Middleware to measure request performance
 */
const performanceMonitor = (req, res, next) => {
  const startTime = process.hrtime.bigint();
  
  // Log response time when response finishes
  res.on('finish', () => {
    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
    
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      timestamp: new Date().toISOString(),
    };
    
    // Log slow requests
    if (duration > 1000) {
      console.warn('⚠️  Slow request detected:', logData);
    } else {
      console.log('📊 Request performance:', logData);
    }
    
    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: send to monitoring service
      // monitoringService.recordRequest(logData);
    }
  });
  
  next();
};

/**
 * Middleware to measure database query performance
 */
const dbPerformanceMonitor = (modelName) => {
  return (req, res, next) => {
    const originalFind = require('mongoose').Query.prototype.exec;
    const startTime = process.hrtime.bigint();
    
    require('mongoose').Query.prototype.exec = function(...args) {
      const queryStart = process.hrtime.bigint();
      
      return originalFind.apply(this, args).then((result) => {
        const queryEnd = process.hrtime.bigint();
        const duration = Number(queryEnd - queryStart) / 1000000;
        
        if (duration > 500) { // Warn for slow queries
          console.warn(`⚠️  Slow DB query [${modelName}]:`, {
            collection: this.model?.modelName || modelName,
            duration: `${duration.toFixed(2)}ms`,
            filter: this.getFilter(),
          });
        }
        
        return result;
      });
    };
    
    next();
  };
};

module.exports = {
  performanceMonitor,
  dbPerformanceMonitor,
};






