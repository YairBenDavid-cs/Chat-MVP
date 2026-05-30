import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { startMockWorker } from '@/mocks';
import App from '@/App.tsx';
import '@/index.css';

startMockWorker()
  .catch((err: unknown) => {
    console.error('[MSW] failed to start, rendering app anyway:', err);
  })
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
