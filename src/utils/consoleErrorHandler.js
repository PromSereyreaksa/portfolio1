// Console error suppression for production
if (import.meta.env.PROD) {
  // Suppress specific development-only warnings in production
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args) => {
    // Filter out known development warnings that don't affect production
    const message = args.join(' ');
    
    // Suppress JSX MIME type warnings in production builds
    if (message.includes('MIME type') && message.includes('text/jsx')) {
      return;
    }
    
    // Suppress React development warnings
    if (message.includes('Warning:') && message.includes('act')) {
      return;
    }
    
    originalWarn.apply(console, args);
  };
  
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Suppress JSX module loading errors in production
    if (message.includes('Failed to load module script') && message.includes('text/jsx')) {
      return;
    }
    
    originalError.apply(console, args);
  };
}
