import type { Dispatch } from 'react';

import type { ChatAction } from '@/messenger/chat/state/chatActions';
import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';
import { login as loginRequest } from '@/login/api/authApi';
import { loginFailure, loginStart, loginSuccess } from '@/login/state/loginActions';
import type { LoginRequest } from '@/login/types/authTypes';

export async function loginUser(
  dispatch: Dispatch<ChatAction>,
  credentials: LoginRequest,
): Promise<void> {
  dispatch(loginStart());
  try {
    const response = await loginRequest(credentials);
    dispatch(loginSuccess(response.user, response.token));
  } catch (err) {
    dispatch(loginFailure(err as ChatError));
  }
}
