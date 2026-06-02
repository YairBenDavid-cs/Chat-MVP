import { setupWorker } from 'msw/browser';
import { authHandlers } from '@/mocks/handlers/authHandlers';
import { conversationsHandlers } from '@/mocks/handlers/conversationsHandlers';
import { messagesHandlers } from '@/mocks/handlers/messagesHandlers';

export const worker = setupWorker(
  ...authHandlers,
  ...conversationsHandlers,
  ...messagesHandlers,
);
