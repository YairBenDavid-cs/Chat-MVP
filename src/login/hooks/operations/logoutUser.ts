import type { Dispatch } from 'react';

import type { ChatAction } from '@/messenger/chat/state/chatActions';
import { logout as logoutRequest } from '@/login/api/authApi';
import { logout } from '@/login/state/loginActions';

export function logoutUser(dispatch: Dispatch<ChatAction>): void {
  logoutRequest();
  dispatch(logout());
}
