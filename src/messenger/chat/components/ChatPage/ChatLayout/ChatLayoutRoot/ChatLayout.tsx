import type { ReactElement, ReactNode } from 'react';

import { MainPanelLayout } from '@/messenger/chat/components/ChatPage/ChatLayout/MainPanelLayout/MainPanelLayout';
import { SidebarPanel } from '@/messenger/chat/components/ChatPage/ChatLayout/SidebarPanel/SidebarPanelRoot/SidebarPanel';

export type ChatLayoutProps = {
  main: ReactNode;
};

type ChatLayoutContainerProps = {
  children: ReactNode;
};

function ChatLayoutContainer({ children }: ChatLayoutContainerProps): ReactElement {
  return <div className="chat-layout">{children}</div>;
}

export function ChatLayout({ main }: ChatLayoutProps): ReactElement {
  return (
    <ChatLayoutContainer>
      <SidebarPanel />
      <MainPanelLayout>{main}</MainPanelLayout>
    </ChatLayoutContainer>
  );
}
