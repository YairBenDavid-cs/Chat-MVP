import type { ChatState } from '@/messenger/chat/types/chatStateTypes';
import { conversationsReducer } from '@/messenger/conversations/state/conversationsReducer';
import { messagesReducer } from '@/messenger/messages/state/messagesReducer';
import { loginReducer } from '@/login/state/loginReducer';
import { LOGOUT } from '@/login/state/loginActionTypes';
import type { ChatAction } from '@/messenger/chat/state/chatActions';
import { initialState } from '@/messenger/chat/state/chatInitialState';

export function reducer(state: ChatState, action: ChatAction): ChatState {
  if (action.type === LOGOUT) {
    return initialState;
  }

  const withLogin = loginReducer(state, action);
  const withConversations = conversationsReducer(withLogin, action);
  return messagesReducer(withConversations, action);
}
