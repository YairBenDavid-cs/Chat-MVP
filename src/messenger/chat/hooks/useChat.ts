import { useEffect } from 'react';

import { getConversations } from '@/messenger/conversations/api/conversationsApi';
import { getMessages } from '@/messenger/messages/api/messagesApi';
import {
  conversationsFetchFailure,
  conversationsFetchStart,
  conversationsFetchSuccess,
  messagesFetchFailure,
  messagesFetchStart,
  messagesFetchSuccess,
} from '@/messenger/chat/state/chatActions';
import { useChatContext } from '@/messenger/chat/state/chatContext';
import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';

export function useChat(): void {
  const { state, dispatch } = useChatContext();
  const { user, selectedConversationId } = state;

  useEffect(() => {
    if (user === null) {
      return;
    }
    dispatch(conversationsFetchStart());
    getConversations()
      .then((conversations) => dispatch(conversationsFetchSuccess(conversations)))
      .catch((err) => dispatch(conversationsFetchFailure(err as ChatError)));
  }, [user, dispatch]);

  useEffect(() => {
    if (selectedConversationId === null) {
      return;
    }
    dispatch(messagesFetchStart());
    getMessages(selectedConversationId)
      .then((page) => dispatch(messagesFetchSuccess(page.messages)))
      .catch((err) => dispatch(messagesFetchFailure(err as ChatError)));
  }, [selectedConversationId, dispatch]);
}
