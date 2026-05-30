import type { UserId } from '@/messenger/chat/types/userTypes';

export type ConversationId = string & { readonly __brand: 'ConversationId' };

/** API / reducer model — matches GET /conversations. */
export type Conversation = {
  id: ConversationId;
  participants: UserId[];
  title: string;
  avatarUrl: string;
  lastMessagePreview: string;
  lastMessageAt: string; // ISO 8601
  unreadCount: number;
};
