import type { Conversation } from '@/messenger/conversations/types/conversationTypes';

export function filterConversationsByQuery(
  conversations: Conversation[],
  query: string,
): Conversation[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length === 0) {
    return conversations;
  }
  return conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(trimmed),
  );
}
