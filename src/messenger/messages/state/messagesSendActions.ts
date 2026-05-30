import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';
import type { User } from '@/messenger/chat/types/userTypes';
import type { Message, MessageId } from '@/messenger/messages/types/messageTypes';
import {
  MESSAGE_SEND_FAILURE,
  MESSAGE_SEND_OPTIMISTIC,
  MESSAGE_SEND_SUCCESS,
  SEND_ERROR_DISMISS,
} from '@/messenger/messages/state/messagesActionTypes';

export type MessageSendOptimisticAction = {
  type: typeof MESSAGE_SEND_OPTIMISTIC;
  payload: {
    tempId: MessageId;
    conversationId: ConversationId;
    text: string;
    senderId: User['id'];
  };
};
export type MessageSendSuccessAction = {
  type: typeof MESSAGE_SEND_SUCCESS;
  payload: { tempId: MessageId; message: Message };
};
export type MessageSendFailureAction = {
  type: typeof MESSAGE_SEND_FAILURE;
  payload: { tempId: MessageId; error: ChatError };
};
export type SendErrorDismissAction = { type: typeof SEND_ERROR_DISMISS };

export function messageOptimistic(
  tempId: MessageId,
  conversationId: ConversationId,
  text: string,
  senderId: User['id'],
): MessageSendOptimisticAction {
  return {
    type: MESSAGE_SEND_OPTIMISTIC,
    payload: { tempId, conversationId, text, senderId },
  };
}

export function messageSendSuccess(
  tempId: MessageId,
  message: Message,
): MessageSendSuccessAction {
  return { type: MESSAGE_SEND_SUCCESS, payload: { tempId, message } };
}

export function messageSendFailure(
  tempId: MessageId,
  error: ChatError,
): MessageSendFailureAction {
  return { type: MESSAGE_SEND_FAILURE, payload: { tempId, error } };
}

export function sendErrorDismiss(): SendErrorDismissAction {
  return { type: SEND_ERROR_DISMISS };
}
