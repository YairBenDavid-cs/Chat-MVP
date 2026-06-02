import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { UserId } from '@/messenger/chat/types/userTypes';
import type { Message, MessageId } from '@/messenger/messages/types/messageTypes';

export const PAGE_SIZE = 20;

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm-001' as MessageId,
    conversationId: 'c-alice-bob' as ConversationId,
    senderId: 'u-alice' as UserId,
    text: 'Hey Bob!',
    createdAt: '2026-05-28T10:00:00Z',
  },
  {
    id: 'm-002' as MessageId,
    conversationId: 'c-alice-bob' as ConversationId,
    senderId: 'u-bob' as UserId,
    text: 'Hi Alice',
    createdAt: '2026-05-28T10:05:00Z',
  },
  {
    id: 'm-003' as MessageId,
    conversationId: 'c-alice-bob' as ConversationId,
    senderId: 'u-alice' as UserId,
    text: 'Lunch tomorrow?',
    createdAt: '2026-05-28T10:15:00Z',
  },
  {
    id: 'm-004' as MessageId,
    conversationId: 'c-alice-bob' as ConversationId,
    senderId: 'u-bob' as UserId,
    text: 'Sure thing',
    createdAt: '2026-05-28T10:20:00Z',
  },
  {
    id: 'm-005' as MessageId,
    conversationId: 'c-alice-bob' as ConversationId,
    senderId: 'u-alice' as UserId,
    text: 'See you tomorrow!',
    createdAt: '2026-05-28T10:30:00Z',
  },
  {
    id: 'm-006' as MessageId,
    conversationId: 'c-alice-carol' as ConversationId,
    senderId: 'u-carol' as UserId,
    text: 'Free this weekend?',
    createdAt: '2026-05-27T13:50:00Z',
  },
  {
    id: 'm-007' as MessageId,
    conversationId: 'c-alice-carol' as ConversationId,
    senderId: 'u-alice' as UserId,
    text: 'Yeah, what is up?',
    createdAt: '2026-05-27T14:00:00Z',
  },
  {
    id: 'm-008' as MessageId,
    conversationId: 'c-alice-carol' as ConversationId,
    senderId: 'u-carol' as UserId,
    text: 'Want to go hiking?',
    createdAt: '2026-05-27T14:10:00Z',
  },
  {
    id: 'm-009' as MessageId,
    conversationId: 'c-alice-carol' as ConversationId,
    senderId: 'u-alice' as UserId,
    text: 'Sounds good',
    createdAt: '2026-05-27T14:15:00Z',
  },
  {
    id: 'm-010' as MessageId,
    conversationId: 'c-bob-carol' as ConversationId,
    senderId: 'u-bob' as UserId,
    text: 'Did you finish the report?',
    createdAt: '2026-05-25T08:30:00Z',
  },
  {
    id: 'm-011' as MessageId,
    conversationId: 'c-bob-carol' as ConversationId,
    senderId: 'u-carol' as UserId,
    text: 'Yes, just sent it',
    createdAt: '2026-05-25T08:45:00Z',
  },
  {
    id: 'm-012' as MessageId,
    conversationId: 'c-bob-carol' as ConversationId,
    senderId: 'u-bob' as UserId,
    text: 'Got it, thanks',
    createdAt: '2026-05-25T09:00:00Z',
  },
];
