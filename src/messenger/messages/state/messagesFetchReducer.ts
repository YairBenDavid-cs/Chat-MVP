import type { ChatAction } from '@/messenger/chat/state/chatActions';
import type { ChatState } from '@/messenger/chat/types/chatStateTypes';
import {
  MESSAGES_FETCH_FAILURE,
  MESSAGES_FETCH_START,
  MESSAGES_FETCH_SUCCESS,
} from '@/messenger/messages/state/messagesActionTypes';

export function messagesFetchReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case MESSAGES_FETCH_START:
      return { ...state, messagesStatus: 'loading', messagesError: null };

    case MESSAGES_FETCH_SUCCESS:
      return {
        ...state,
        messagesStatus: 'success',
        messagesError: null,
        messages: action.payload.messages,
      };

    case MESSAGES_FETCH_FAILURE:
      return {
        ...state,
        messagesStatus: 'error',
        messagesError: action.payload.error,
      };

    default:
      return state;
  }
}
