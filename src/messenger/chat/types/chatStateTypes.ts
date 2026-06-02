import type { AuthToken } from '@/login/types/authTypes';
import type { Conversation, ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { Message } from '@/messenger/messages/types/messageTypes';
import type { User } from '@/messenger/chat/types/userTypes';
import type { ApiError } from '@/shared/api/apiTypes';

export type Status = 'idle' | 'loading' | 'success' | 'error';

export type Error = ApiError;

export type ChatState = {
  user: User | null;
  token: AuthToken | null;

  conversations: Conversation[];
  selectedConversationId: ConversationId | null;

  messages: Message[];

  conversationsStatus: Status;
  messagesStatus: Status;
  authStatus: Status;
  sendStatus: Status;

  conversationsError: Error | null;
  messagesError: Error | null;
  authError: Error | null;
  sendError: Error | null;
};
