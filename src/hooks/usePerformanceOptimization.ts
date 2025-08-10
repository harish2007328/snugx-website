import { useEffect } from 'react';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Defer non-critical JavaScript
    const deferredScripts = () => {
      // Remove unused event listeners
      const removeUnusedListeners = () => {
        // Clean up any global event listeners that might not be needed
        window.removeEventListener('resize', () => {});
      };

      // Optimize scroll performance
      let ticking = false;
      const optimizedScrollHandler = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Handle scroll events efficiently
            ticking = false;
          });
          ticking = true;
        }
      };

      // Debounce resize events
      let resizeTimeout: NodeJS.Timeout;
      const optimizedResizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // Handle resize events
        }, 150);
      };

      window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
      window.addEventListener('resize', optimizedResizeHandler, { passive: true });

      return () => {
        window.removeEventListener('scroll', optimizedScrollHandler);
        window.removeEventListener('resize', optimizedResizeHandler);
        removeUnusedListeners();
      };
    };

    // Defer execution to avoid blocking main thread
    const timeoutId = setTimeout(deferredScripts, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Performance monitoring
  useEffect(() => {
    if ('performance' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
      } catch (e) {
        // Fallback for browsers that don't support these metrics
      }

      return () => observer.disconnect();
    }
  }, []);
};