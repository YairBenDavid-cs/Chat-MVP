import type { ChatAction } from '@/messenger/chat/state/chatActions';
import type { ChatState } from '@/messenger/chat/types/chatStateTypes';
import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  RESTORE_AUTH,
} from '@/login/state/loginActionTypes';

export function loginReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, authStatus: 'loading', authError: null };

    case LOGIN_SUCCESS:
    case RESTORE_AUTH:
      return {
        ...state,
        authStatus: 'success',
        authError: null,
        user: action.payload.user,
        token: action.payload.token,
      };

    case LOGIN_FAILURE:
      return { ...state, authStatus: 'error', authError: action.payload.error };

    default:
      return state;
  }
}
