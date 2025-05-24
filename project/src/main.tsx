import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWithBackend from './AppWithBackend.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithBackend />
  </StrictMode>
);
