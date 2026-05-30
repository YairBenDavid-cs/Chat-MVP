import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { UserId } from '@/messenger/chat/types/userTypes';
import type { ConversationSeed } from '@/mocks/utils/enrichConversation';

export const MOCK_CONVERSATION_SEEDS: ConversationSeed[] = [
  {
    id: 'c-alice-bob' as ConversationId,
    participants: ['u-alice' as UserId, 'u-bob' as UserId],
    lastMessagePreview: 'See you tomorrow!',
    lastMessageAt: '2026-05-28T10:30:00Z',
    unreadCount: 0,
  },
  {
    id: 'c-alice-carol' as ConversationId,
    participants: ['u-alice' as UserId, 'u-carol' as UserId],
    lastMessagePreview: 'Sounds good',
    lastMessageAt: '2026-05-27T14:15:00Z',
    unreadCount: 2,
  },
  {
    id: 'c-bob-carol' as ConversationId,
    participants: ['u-bob' as UserId, 'u-carol' as UserId],
    lastMessagePreview: 'Got it, thanks',
    lastMessageAt: '2026-05-25T09:00:00Z',
    unreadCount: 0,
  },
];

export function findConversationSeedById(id: ConversationId): ConversationSeed | undefined {
  return MOCK_CONVERSATION_SEEDS.find((c) => c.id === id);
}
