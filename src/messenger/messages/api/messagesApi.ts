import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { Message, MessagesPage, PaginationCursor } from '@/messenger/messages/types/messageTypes';
import { apiFetch } from '@/shared/api/apiClient';

export async function getMessages(
  conversationId: ConversationId,
  cursor?: PaginationCursor,
): Promise<MessagesPage> {
  const query = cursor !== undefined && cursor !== null
    ? `?cursor=${encodeURIComponent(cursor)}`
    : '';
  return apiFetch<MessagesPage>(`/conversations/${conversationId}/messages${query}`);
}

export async function sendMessage(
  conversationId: ConversationId,
  text: string,
): Promise<Message> {
  return apiFetch<Message>(`/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}
