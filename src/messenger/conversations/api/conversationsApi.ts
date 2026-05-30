import type { Conversation } from '@/messenger/conversations/types/conversationTypes';
import { apiFetch } from '@/messenger/chat/api/apiClient';

export async function getConversations(): Promise<Conversation[]> {
  return apiFetch<Conversation[]>('/conversations');
}
