import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { Message } from '@/messenger/messages/types/messageTypes';
import { INITIAL_MESSAGES } from '@/mocks/data/mockMessages';

function hydrate(): Map<ConversationId, Message[]> {
  const store = new Map<ConversationId, Message[]>();
  for (const message of INITIAL_MESSAGES) {
    const existing = store.get(message.conversationId) ?? [];
    store.set(message.conversationId, [...existing, message]);
  }
  return store;
}

export const messageStore: Map<ConversationId, Message[]> = hydrate();
