import type { ReactElement } from 'react';

import { useConversationListView } from '@/messenger/conversations/hooks/useConversationListView';
import {
  ConversationListProvider,
  toConversationListContextValue,
} from '@/messenger/conversations/state/conversationListContext';
import { ConversationList } from '@/messenger/conversations/components/ConversationList/ConversationListRoot/ConversationList';
import { ConversationSearchBar } from '@/messenger/chat/components/ChatPage/ChatLayout/SidebarPanel/ConversationSearchBar/ConversationSearchBar';
import { ConversationSidebarPanel } from '@/messenger/chat/components/ChatPage/ChatLayout/SidebarPanel/ConversationSidebarPanel/ConversationSidebarPanel';
import { SidebarShell } from '@/messenger/chat/components/ChatPage/ChatLayout/SidebarPanel/SidebarShell/SidebarShell';

export function SidebarPanel(): ReactElement {
  const { view } = useConversationListView();

  if (view.kind === 'list' || view.kind === 'noResults') {
    return (
      <SidebarShell>
        <ConversationListProvider value={toConversationListContextValue(view)}>
          <ConversationSidebarPanel>
            <ConversationSearchBar />
            <ConversationList view={view} />
          </ConversationSidebarPanel>
        </ConversationListProvider>
      </SidebarShell>
    );
  }

  return (
    <SidebarShell>
      <ConversationList view={view} />
    </SidebarShell>
  );
}
