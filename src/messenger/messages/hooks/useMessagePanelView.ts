import { useAuth } from '@/login/hooks/useAuth';
import { useChatContext } from '@/messenger/chat/state/chatContext';
import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';
import type { MessagePanelView } from '@/messenger/messages/types/messageViewTypes';
import { resolveMessagePanelView } from '@/messenger/messages/utils/messageViewUtils';
import { useMessages } from '@/messenger/messages/hooks/useMessages';

export type UseMessagePanelViewResult = {
  view: MessagePanelView;
  sendError: ChatError | null;
  sendMessage: (text: string) => Promise<void>;
  dismissSendError: () => void;
  isComposerDisabled: boolean;
};

export function useMessagePanelView(): UseMessagePanelViewResult {
  const { messages, status, sendError, sendMessage, dismissSendError } = useMessages();
  const { user } = useAuth();
  const { state } = useChatContext();
  const currentUserId = user?.id ?? null;
  const hasSelection = state.selectedConversationId !== null;

  return {
    view: resolveMessagePanelView(status, messages, currentUserId, hasSelection),
    sendError,
    sendMessage,
    dismissSendError,
    isComposerDisabled: currentUserId === null,
  };
}
