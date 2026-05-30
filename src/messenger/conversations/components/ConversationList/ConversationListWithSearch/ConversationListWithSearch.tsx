import type { ReactElement } from 'react';

import type { ConversationListView } from '@/messenger/conversations/types/conversationViewTypes';
import { ConversationListRows } from '@/messenger/conversations/components/ConversationList/ConversationListWithSearch/ConversationListRows';
import { ConversationSearchBar } from '@/messenger/conversations/components/ConversationList/ConversationSearchBar';
import { ConversationSidebarPanel } from '@/messenger/conversations/components/ConversationList/ConversationSidebarPanel';

export type ConversationListWithSearchProps = {
  view: Extract<ConversationListView, { kind: 'list' }>;
};

export function ConversationListWithSearch({
  view,
}: ConversationListWithSearchProps): ReactElement {
  return (
    <ConversationSidebarPanel>
      <ConversationSearchBar />
      <ConversationListRows rows={view.rows} />
    </ConversationSidebarPanel>
  );
}
