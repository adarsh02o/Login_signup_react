import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';   // Global styles & Tailwind
import App from './App.jsx';

/**
 * Application Entry Point
 * Renders React app into the root DOM element
 * StrictMode enables additional development checks
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
