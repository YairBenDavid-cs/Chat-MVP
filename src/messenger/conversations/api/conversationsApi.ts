import type { Conversation } from '@/messenger/conversations/types/conversationTypes';
import { apiFetch } from '@/shared/api/apiClient';

export async function getConversations(): Promise<Conversation[]> {
  return apiFetch<Conversation[]>('/conversations');
}
