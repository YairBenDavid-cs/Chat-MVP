import { setupServer } from 'msw/node';
import { authHandlers } from '@/mocks/handlers/authHandlers';
import { conversationsHandlers } from '@/mocks/handlers/conversationsHandlers';
import { messagesHandlers } from '@/mocks/handlers/messagesHandlers';

export const server = setupServer(
  ...authHandlers,
  ...conversationsHandlers,
  ...messagesHandlers,
);
