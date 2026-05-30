import type { ReactElement, ReactNode } from 'react';

import { SidebarFooter } from '@/messenger/chat/components/ChatPage/ChatLayout/SidebarLayout/SidebarFooter/SidebarFooter';

export type SidebarLayoutProps = {
  children: ReactNode;
};

type SidebarContainerProps = {
  children: ReactNode;
};

function SidebarContainer({ children }: SidebarContainerProps): ReactElement {
  return <aside className="chat-sidebar">{children}</aside>;
}

type SidebarContentProps = {
  children: ReactNode;
};

function SidebarContent({ children }: SidebarContentProps): ReactElement {
  return <div className="chat-sidebar-content">{children}</div>;
}

export function SidebarLayout({ children }: SidebarLayoutProps): ReactElement {
  return (
    <SidebarContainer>
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter />
    </SidebarContainer>
  );
}
