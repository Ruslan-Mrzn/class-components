import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/index.tsx';

createRoot(document.getElementById('root') ?? document.body).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
