import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { UserId } from '@/messenger/chat/types/userTypes';

export type MessageId = string & { readonly __brand: 'MessageId' };

export type Message = {
  id: MessageId;
  conversationId: ConversationId;
  senderId: UserId;
  text: string;
  createdAt: string; // ISO 8601
  isOptimistic?: boolean; // true while send is in-flight
};

export type PaginationCursor = string | null;

export type MessagesPage = {
  messages: Message[];
  nextCursor: PaginationCursor;
};
