import type { Dispatch } from 'react';

import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { ChatAction } from '@/messenger/chat/state/chatActions';
import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';
import type { User } from '@/messenger/chat/types/userTypes';
import { sendMessage as sendMessageRequest } from '@/messenger/messages/api/messagesApi';
import {
  messageOptimistic,
  messageSendFailure,
  messageSendSuccess,
} from '@/messenger/messages/state/messagesActions';
import type { MessageId } from '@/messenger/messages/types/messageTypes';

export async function sendChatMessage(
  dispatch: Dispatch<ChatAction>,
  conversationId: ConversationId | null,
  user: User | null,
  text: string,
): Promise<void> {
  if (conversationId === null || user === null) {
    return;
  }
  const senderId = user.id;
  const tempId = `optimistic-${Date.now()}` as MessageId;

  dispatch(messageOptimistic(tempId, conversationId, text, senderId));
  try {
    const message = await sendMessageRequest(conversationId, text);
    dispatch(messageSendSuccess(tempId, message));
  } catch (err) {
    dispatch(messageSendFailure(tempId, err as ChatError));
  }
}
