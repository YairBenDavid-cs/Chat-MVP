import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';
import type { Conversation, ConversationId } from '@/messenger/conversations/types/conversationTypes';
import {
  CONVERSATIONS_FETCH_FAILURE,
  CONVERSATIONS_FETCH_START,
  CONVERSATIONS_FETCH_SUCCESS,
  CONVERSATION_DESELECT,
  CONVERSATION_MARK_AS_READ,
  CONVERSATION_SELECT,
} from '@/messenger/conversations/state/conversationsActionTypes';

export type ConversationsFetchStartAction = { type: typeof CONVERSATIONS_FETCH_START };

export type ConversationsFetchSuccessAction = {
  type: typeof CONVERSATIONS_FETCH_SUCCESS;
  payload: { conversations: Conversation[] };
};
export type ConversationsFetchFailureAction = {
  type: typeof CONVERSATIONS_FETCH_FAILURE;
  payload: { error: ChatError };
};
export type ConversationSelectAction = {
  type: typeof CONVERSATION_SELECT;
  payload: { conversationId: ConversationId };
};
export type ConversationDeselectAction = { type: typeof CONVERSATION_DESELECT };
export type ConversationMarkAsReadAction = {
  type: typeof CONVERSATION_MARK_AS_READ;
  payload: { conversationId: ConversationId };
};

export type ConversationsAction =
  | ConversationsFetchStartAction
  | ConversationsFetchSuccessAction
  | ConversationsFetchFailureAction
  | ConversationSelectAction
  | ConversationDeselectAction
  | ConversationMarkAsReadAction;

export function conversationsFetchStart(): ConversationsFetchStartAction {
  return { type: CONVERSATIONS_FETCH_START };
}

export function conversationsFetchSuccess(
  conversations: Conversation[],
): ConversationsFetchSuccessAction {
  return { type: CONVERSATIONS_FETCH_SUCCESS, payload: { conversations } };
}

export function conversationsFetchFailure(error: ChatError): ConversationsFetchFailureAction {
  return { type: CONVERSATIONS_FETCH_FAILURE, payload: { error } };
}

export function conversationSelect(conversationId: ConversationId): ConversationSelectAction {
  return { type: CONVERSATION_SELECT, payload: { conversationId } };
}

export function conversationDeselect(): ConversationDeselectAction {
  return { type: CONVERSATION_DESELECT };
}

export function conversationMarkAsRead(
  conversationId: ConversationId,
): ConversationMarkAsReadAction {
  return { type: CONVERSATION_MARK_AS_READ, payload: { conversationId } };
}
