import type { ReactElement } from 'react';

import { useConversationListView } from '@/messenger/conversations/hooks/useConversationListView';
import {
  ConversationListProvider,
  toConversationListContextValue,
} from '@/messenger/conversations/state/conversationListContext';
import { ConversationEmptyState } from '@/messenger/conversations/components/ConversationList/ConversationEmptyState';
import { ConversationListErrorState } from '@/messenger/conversations/components/ConversationList/ConversationListErrorState';
import { ConversationListLoadingState } from '@/messenger/conversations/components/ConversationList/ConversationListLoadingState';
import { ConversationListNoResultsPanel } from '@/messenger/conversations/components/ConversationList/ConversationListNoResultsPanel/ConversationListNoResultsPanel';
import { ConversationListWithSearch } from '@/messenger/conversations/components/ConversationList/ConversationListWithSearch/ConversationListWithSearch';

export function ConversationList(): ReactElement {
  const { view } = useConversationListView();

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
    return (
      <ConversationListProvider value={toConversationListContextValue(view)}>
        <ConversationListNoResultsPanel />
      </ConversationListProvider>
    );
  }
  return (
    <ConversationListProvider value={toConversationListContextValue(view)}>
      <ConversationListWithSearch view={view} />
    </ConversationListProvider>
  );
}
