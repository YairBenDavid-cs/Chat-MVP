import type { ChatAction } from '@/messenger/chat/state/chatActions';
import type { ChatState } from '@/messenger/chat/types/chatStateTypes';
import {
  CONVERSATIONS_FETCH_FAILURE,
  CONVERSATIONS_FETCH_START,
  CONVERSATIONS_FETCH_SUCCESS,
  CONVERSATION_DESELECT,
  CONVERSATION_MARK_AS_READ,
  CONVERSATION_SELECT,
} from '@/messenger/conversations/state/conversationsActionTypes';

export function conversationsReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case CONVERSATIONS_FETCH_START:
      return { ...state, conversationsStatus: 'loading', conversationsError: null };

    case CONVERSATIONS_FETCH_SUCCESS:
      return {
        ...state,
        conversationsStatus: 'success',
        conversationsError: null,
        conversations: action.payload.conversations,
      };

    case CONVERSATIONS_FETCH_FAILURE:
      return {
        ...state,
        conversationsStatus: 'error',
        conversationsError: action.payload.error,
      };

    case CONVERSATION_SELECT:
      return { ...state, selectedConversationId: action.payload.conversationId };

    case CONVERSATION_DESELECT:
      return { ...state, selectedConversationId: null };

    case CONVERSATION_MARK_AS_READ: {
      const targetId = action.payload.conversationId;
      return {
        ...state,
        conversations: state.conversations.map((c) =>
          c.id === targetId && c.unreadCount > 0 ? { ...c, unreadCount: 0 } : c,
        ),
      };
    }

    default:
      return state;
  }
}
