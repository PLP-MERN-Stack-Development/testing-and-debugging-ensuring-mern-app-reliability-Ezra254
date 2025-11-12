/**
 * Performance monitoring utilities for client-side
 */

/**
 * Measure performance of a function
 * @param {Function} fn - Function to measure
 * @param {string} label - Label for the measurement
 * @returns {*} The result of the function
 */
export const measurePerformance = (fn, label) => {
  if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
    const startMark = `${label}-start`;
    const endMark = `${label}-end`;
    
    window.performance.mark(startMark);
    const result = fn();
    
    if (result instanceof Promise) {
      return result.then((res) => {
        window.performance.mark(endMark);
        window.performance.measure(label, startMark, endMark);
        const measure = window.performance.getEntriesByName(label)[0];
        console.log(`Performance [${label}]: ${measure.duration.toFixed(2)}ms`);
        return res;
      });
    } else {
      window.performance.mark(endMark);
      window.performance.measure(label, startMark, endMark);
      const measure = window.performance.getEntriesByName(label)[0];
      console.log(`Performance [${label}]: ${measure.duration.toFixed(2)}ms`);
      return result;
    }
  }
  
  return fn();
};

/**
 * Log Web Vitals metrics
 */
export const logWebVitals = (metric) => {
  console.log('Web Vital:', {
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    id: metric.id,
  });
  
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: send to analytics
    // analytics.track('web_vital', metric);
  }
};

/**
 * Monitor component render performance
 * @param {string} componentName - Name of the component
 * @returns {Function} Function to end measurement
 */
export const startRenderMeasure = (componentName) => {
  if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
    const markName = `render-${componentName}-start`;
    window.performance.mark(markName);
    
    return () => {
      const endMark = `render-${componentName}-end`;
      window.performance.mark(endMark);
      window.performance.measure(`render-${componentName}`, markName, endMark);
      const measure = window.performance.getEntriesByName(`render-${componentName}`)[0];
      
      if (measure.duration > 16) { // Warning if render takes more than 16ms (60fps)
        console.warn(`Slow render detected for ${componentName}: ${measure.duration.toFixed(2)}ms`);
      }
    };
  }
  
  return () => {}; // No-op if performance API not available
};






