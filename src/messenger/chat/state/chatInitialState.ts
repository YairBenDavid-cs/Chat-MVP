import type { ChatState } from '@/messenger/chat/types/chatStateTypes';

export const initialState: ChatState = {
  user: null,
  token: null,
  conversations: [],
  selectedConversationId: null,
  messages: [],
  conversationsStatus: 'idle',
  messagesStatus: 'idle',
  authStatus: 'idle',
  sendStatus: 'idle',
  conversationsError: null,
  messagesError: null,
  authError: null,
  sendError: null,
};
