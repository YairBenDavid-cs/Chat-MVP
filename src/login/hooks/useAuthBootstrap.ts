import { useEffect } from 'react';

import { useChatContext } from '@/messenger/chat/state/chatContext';
import { restoreAuth } from '@/messenger/chat/state/chatActions';
import { getAuthToken, getAuthUser } from '@/shared/auth/authSession';

export function useAuthBootstrap(): void {
  const { state, dispatch } = useChatContext();

  useEffect(() => {
    if (state.user !== null) {
      return;
    }
    const user = getAuthUser();
    const token = getAuthToken();
    if (user === null || token === null) {
      return;
    }
    dispatch(restoreAuth(user, token));
  }, [state.user, dispatch]);
}
