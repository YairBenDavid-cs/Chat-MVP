import type { ChatAction } from '@/messenger/chat/state/chatActions';
import type { ChatState } from '@/messenger/chat/types/chatStateTypes';
import type { Message } from '@/messenger/messages/types/messageTypes';
import {
  MESSAGE_SEND_FAILURE,
  MESSAGE_SEND_OPTIMISTIC,
  MESSAGE_SEND_SUCCESS,
  SEND_ERROR_DISMISS,
} from '@/messenger/messages/state/messagesActionTypes';

export function messagesSendReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case MESSAGE_SEND_OPTIMISTIC: {
      const optimisticMessage: Message = {
        id: action.payload.tempId,
        conversationId: action.payload.conversationId,
        senderId: action.payload.senderId,
        text: action.payload.text,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };
      return {
        ...state,
        messages: [...state.messages, optimisticMessage],
        sendStatus: 'loading',
        sendError: null,
      };
    }

    case MESSAGE_SEND_SUCCESS: {
      const updatedMessages = state.messages.map((message) => (
        message.id === action.payload.tempId
          ? { ...action.payload.message, isOptimistic: false }
          : message
      ));
      return { ...state, messages: updatedMessages, sendStatus: 'success', sendError: null };
    }

    case MESSAGE_SEND_FAILURE: {
      const rolledBackMessages = state.messages.filter((message) => (
        message.id !== action.payload.tempId
      ));
      return {
        ...state,
        messages: rolledBackMessages,
        sendStatus: 'error',
        sendError: action.payload.error,
      };
    }

    case SEND_ERROR_DISMISS:
      return { ...state, sendError: null };

    default:
      return state;
  }
}
