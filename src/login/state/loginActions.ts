import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';
import type { User } from '@/messenger/chat/types/userTypes';
import type { AuthToken } from '@/login/types/authTypes';
import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  RESTORE_AUTH,
} from '@/login/state/loginActionTypes';

export type LoginStartAction = { type: typeof LOGIN_START };

export type LoginSuccessAction = {
  type: typeof LOGIN_SUCCESS;
  payload: { user: User; token: AuthToken };
};

export type LoginFailureAction = {
  type: typeof LOGIN_FAILURE;
  payload: { error: ChatError };
};

export type LogoutAction = { type: typeof LOGOUT };

export type RestoreAuthAction = {
  type: typeof RESTORE_AUTH;
  payload: { user: User; token: AuthToken };
};

export type LoginAction =
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | RestoreAuthAction;

export function loginStart(): LoginStartAction {
  return { type: LOGIN_START };
}

export function loginSuccess(user: User, token: AuthToken): LoginSuccessAction {
  return { type: LOGIN_SUCCESS, payload: { user, token } };
}

export function loginFailure(error: ChatError): LoginFailureAction {
  return { type: LOGIN_FAILURE, payload: { error } };
}

export function logout(): LogoutAction {
  return { type: LOGOUT };
}

export function restoreAuth(user: User, token: AuthToken): RestoreAuthAction {
  return { type: RESTORE_AUTH, payload: { user, token } };
}
