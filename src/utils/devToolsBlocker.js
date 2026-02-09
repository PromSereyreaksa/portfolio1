// Dev Tools Detection and Blocking
// Only active in production builds

const isProduction = import.meta.env.PROD;

const redirect = () => {
  window.location.replace('/blocked.html');
};

const initDevToolsBlocker = () => {
  if (!isProduction) return;

  // Debugger detection
  const detectDebugger = () => {
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100) redirect();
  };

  // Console detection
  const detectConsole = () => {
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        redirect();
      }
    });
    console.log(element);
  };

  // Window size detection (dev tools opening changes window dimensions)
  let windowWidth = window.outerWidth - window.innerWidth;
  let windowHeight = window.outerHeight - window.innerHeight;
  
  const detectResize = () => {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    
    if (Math.abs(widthDiff - windowWidth) > 160 || Math.abs(heightDiff - windowHeight) > 160) {
      redirect();
    }
  };

  // Keyboard shortcut detection
  const detectKeyboard = (e) => {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      redirect();
      return false;
    }
    
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault();
      redirect();
      return false;
    }
    
    // Cmd+Option+I, Cmd+Option+J, Cmd+Option+C (Mac)
    if (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault();
      redirect();
      return false;
    }
    
    // Ctrl+U (view source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      redirect();
      return false;
    }
    
    // Cmd+U (view source on Mac)
    if (e.metaKey && e.keyCode === 85) {
      e.preventDefault();
      redirect();
      return false;
    }
  };

  // Right-click detection
  const detectRightClick = (e) => {
    e.preventDefault();
    redirect();
    return false;
  };

  // DevTools open detection via console
  const detectDevTools = () => {
    const threshold = 160;
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      redirect();
    }
  };

  // Attach event listeners
  document.addEventListener('keydown', detectKeyboard);
  document.addEventListener('contextmenu', detectRightClick);
  window.addEventListener('resize', detectResize);

  // Regular checks
  setInterval(detectDebugger, 1000);
  setInterval(detectConsole, 2000);
  setInterval(detectDevTools, 1000);

  // Initial check
  detectDevTools();
};

export default initDevToolsBlocker;
