import type { Dispatch } from 'react';

import type { ChatAction } from '@/messenger/chat/state/chatActions';
import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import { conversationMarkAsRead, conversationSelect } from '@/messenger/conversations/state/conversationsActions';

export function selectConversation(
  dispatch: Dispatch<ChatAction>,
  currentId: ConversationId | null,
  nextId: ConversationId,
): void {
  if (currentId === nextId) {
    return;
  }
  dispatch(conversationSelect(nextId));
  dispatch(conversationMarkAsRead(nextId));
}
