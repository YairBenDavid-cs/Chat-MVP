import type { ReactElement } from 'react';

import type { ConversationListView } from '@/messenger/conversations/types/conversationViewTypes';
import { ConversationEmptyState } from '@/messenger/conversations/components/ConversationList/ConversationListState/ConversationEmptyState/ConversationEmptyState';
import { ConversationListErrorState } from '@/messenger/conversations/components/ConversationList/ConversationListState/ConversationListErrorState/ConversationListErrorState';
import { ConversationListLoadingState } from '@/messenger/conversations/components/ConversationList/ConversationListState/ConversationListLoadingState/ConversationListLoadingStateRoot/ConversationListLoadingState';
import { ConversationListNoResults } from '@/messenger/conversations/components/ConversationList/ConversationListNoResults/ConversationListNoResults';
import { ConversationListRows } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListRowsRoot/ConversationListRows';

export type ConversationListProps = {
  view: ConversationListView;
};

export function ConversationList({ view }: ConversationListProps): ReactElement {
  if (view.kind === 'loading') {
    return <ConversationListLoadingState />;
  }
  if (view.kind === 'error') {
    return <ConversationListErrorState />;
  }
  if (view.kind === 'empty') {
    return <ConversationEmptyState />;
  }
  if (view.kind === 'noResults') {
    return <ConversationListNoResults query={view.query} />;
  }
  return <ConversationListRows rows={view.rows} />;
}
