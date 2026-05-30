import { useChatContext } from '@/messenger/chat/state/chatContext';
import type { Error as ChatError, Status } from '@/messenger/chat/types/chatStateTypes';
import type { Conversation, ConversationId } from '@/messenger/conversations/types/conversationTypes';
import { deselectConversation } from '@/messenger/conversations/hooks/operations/deselectConversation';
import { selectConversation } from '@/messenger/conversations/hooks/operations/selectConversation';

export type UseConversationsResult = {
  conversations: Conversation[];
  status: Status;
  error: ChatError | null;
  selectedId: ConversationId | null;
  selectConversation: (id: ConversationId) => void;
  deselectConversation: () => void;
};

export function useConversations(): UseConversationsResult {
  const { state, dispatch } = useChatContext();

  return {
    conversations: state.conversations,
    status: state.conversationsStatus,
    error: state.conversationsError,
    selectedId: state.selectedConversationId,
    selectConversation: (id: ConversationId) =>
      selectConversation(dispatch, state.selectedConversationId, id),
    deselectConversation: () =>
      deselectConversation(dispatch, state.selectedConversationId),
  };
}
