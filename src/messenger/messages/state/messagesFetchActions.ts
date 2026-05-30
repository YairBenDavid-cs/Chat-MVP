import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';
import type { Message } from '@/messenger/messages/types/messageTypes';
import {
  MESSAGES_FETCH_FAILURE,
  MESSAGES_FETCH_START,
  MESSAGES_FETCH_SUCCESS,
} from '@/messenger/messages/state/messagesActionTypes';

export type MessagesFetchStartAction = { type: typeof MESSAGES_FETCH_START };
export type MessagesFetchSuccessAction = {
  type: typeof MESSAGES_FETCH_SUCCESS;
  payload: { messages: Message[] };
};
export type MessagesFetchFailureAction = {
  type: typeof MESSAGES_FETCH_FAILURE;
  payload: { error: ChatError };
};

export function messagesFetchStart(): MessagesFetchStartAction {
  return { type: MESSAGES_FETCH_START };
}

export function messagesFetchSuccess(messages: Message[]): MessagesFetchSuccessAction {
  return { type: MESSAGES_FETCH_SUCCESS, payload: { messages } };
}

export function messagesFetchFailure(error: ChatError): MessagesFetchFailureAction {
  return { type: MESSAGES_FETCH_FAILURE, payload: { error } };
}
