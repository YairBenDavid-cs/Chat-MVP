import { CONVERSATION_SELECT } from '@/messenger/conversations/state/conversationsActionTypes';
import type { ChatAction } from '@/messenger/chat/state/chatActions';
import type { ChatState } from '@/messenger/chat/types/chatStateTypes';
import { messagesFetchReducer } from '@/messenger/messages/state/messagesFetchReducer';
import { messagesSendReducer } from '@/messenger/messages/state/messagesSendReducer';

export function messagesReducer(state: ChatState, action: ChatAction): ChatState {
  if (action.type === CONVERSATION_SELECT) {
    return {
      ...state,
      messages: [],
      messagesStatus: 'idle',
      messagesError: null,
      sendError: null,
    };
  }

  const withFetch = messagesFetchReducer(state, action);
  return messagesSendReducer(withFetch, action);
}
