import { useChatContext } from '@/messenger/chat/state/chatContext';
import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';
import type { User } from '@/messenger/chat/types/userTypes';
import type { LoginRequest } from '@/login/types/authTypes';
import { loginUser } from '@/login/hooks/operations/loginUser';
import { logoutUser } from '@/login/hooks/operations/logoutUser';

export type UseAuthResult = {
  user: User | null;
  isLoading: boolean;
  error: ChatError | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
};

export function useAuth(): UseAuthResult {
  const { state, dispatch } = useChatContext();

  return {
    user: state.user,
    isLoading: state.authStatus === 'loading',
    error: state.authError,
    login: loginUser.bind(null, dispatch),
    logout: logoutUser.bind(null, dispatch),
  };
}
