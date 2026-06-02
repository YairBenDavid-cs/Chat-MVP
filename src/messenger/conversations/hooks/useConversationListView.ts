import type { ConversationListView } from '@/messenger/conversations/types/conversationViewTypes';
import { resolveConversationListView } from '@/messenger/conversations/utils/conversationViewUtils';
import { useConversations } from '@/messenger/conversations/hooks/useConversations';
import { useConversationSearch } from '@/messenger/conversations/hooks/useConversationSearch';

export type UseConversationListViewResult = {
  view: ConversationListView;
};

export function useConversationListView(): UseConversationListViewResult {
  const { conversations, status, selectedId, selectConversation } = useConversations();
  const { query, setQuery } = useConversationSearch();

  return {
    view: resolveConversationListView(
      status,
      conversations,
      selectedId,
      selectConversation,
      query,
      setQuery,
    ),
  };
}
