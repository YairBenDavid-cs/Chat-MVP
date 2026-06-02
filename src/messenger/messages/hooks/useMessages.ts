import { useChatContext } from '@/messenger/chat/state/chatContext';
import type { Error as ChatError, Status } from '@/messenger/chat/types/chatStateTypes';
import type { Message } from '@/messenger/messages/types/messageTypes';
import { dismissSendError } from '@/messenger/messages/hooks/operations/dismissSendError';
import { sendChatMessage } from '@/messenger/messages/hooks/operations/sendChatMessage';

export type UseMessagesResult = {
  messages: Message[];
  status: Status;
  sendError: ChatError | null;
  sendMessage: (text: string) => Promise<void>;
  dismissSendError: () => void;
};

export function useMessages(): UseMessagesResult {
  const { state, dispatch } = useChatContext();

  return {
    messages: state.messages,
    status: state.messagesStatus,
    sendError: state.sendError,
    sendMessage: sendChatMessage.bind(
      null,
      dispatch,
      state.selectedConversationId,
      state.user,
    ),
    dismissSendError: dismissSendError.bind(null, dispatch),
  };
}
