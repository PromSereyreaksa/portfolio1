import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// Handle console errors gracefully
import './utils/consoleErrorHandler.js'
// Dev tools blocker (production only)
import initDevToolsBlocker from './utils/devToolsBlocker.js'

// Initialize dev tools blocking in production
initDevToolsBlocker();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
