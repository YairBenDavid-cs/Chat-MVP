import type { Dispatch } from 'react';

import type { ChatAction } from '@/messenger/chat/state/chatActions';
import { conversationDeselect } from '@/messenger/conversations/state/conversationsActions';
import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';

export function deselectConversation(
  dispatch: Dispatch<ChatAction>,
  currentId: ConversationId | null,
): void {
  if (currentId === null) {
    return;
  }
  dispatch(conversationDeselect());
}
