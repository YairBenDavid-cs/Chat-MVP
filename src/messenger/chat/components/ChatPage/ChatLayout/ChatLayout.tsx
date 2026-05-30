import type { ReactElement, ReactNode } from 'react';

import { MainPanelLayout } from '@/messenger/chat/components/ChatPage/ChatLayout/MainPanelLayout';
import { SidebarLayout } from '@/messenger/chat/components/ChatPage/ChatLayout/SidebarLayout/SidebarLayout';

export type ChatLayoutProps = {
  sidebar: ReactNode;
  main: ReactNode;
};

type ChatLayoutContainerProps = {
  children: ReactNode;
};

function ChatLayoutContainer({ children }: ChatLayoutContainerProps): ReactElement {
  return <div className="chat-layout">{children}</div>;
}

export function ChatLayout({ sidebar, main }: ChatLayoutProps): ReactElement {
  return (
    <ChatLayoutContainer>
      <SidebarLayout>{sidebar}</SidebarLayout>
      <MainPanelLayout>{main}</MainPanelLayout>
    </ChatLayoutContainer>
  );
}
