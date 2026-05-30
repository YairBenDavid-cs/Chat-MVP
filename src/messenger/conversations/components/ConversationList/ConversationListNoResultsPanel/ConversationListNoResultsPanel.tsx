import type { ReactElement } from 'react';

import { useConversationListContext } from '@/messenger/conversations/state/conversationListContext';
import { ConversationListNoResults } from '@/messenger/conversations/components/ConversationList/ConversationListNoResultsPanel/ConversationListNoResults';
import { ConversationSearchBar } from '@/messenger/conversations/components/ConversationList/ConversationSearchBar';
import { ConversationSidebarPanel } from '@/messenger/conversations/components/ConversationList/ConversationSidebarPanel';

export function ConversationListNoResultsPanel(): ReactElement {
  const { query } = useConversationListContext();
  return (
    <ConversationSidebarPanel>
      <ConversationSearchBar />
      <ConversationListNoResults query={query} />
    </ConversationSidebarPanel>
  );
}
