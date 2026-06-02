import type { ReactElement, ReactNode } from 'react';

import { SidebarFooter } from '@/messenger/chat/components/ChatPage/ChatLayout/SidebarPanel/SidebarFooter/SidebarFooterRoot/SidebarFooter';

export type SidebarShellProps = {
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

export function SidebarShell({ children }: SidebarShellProps): ReactElement {
  return (
    <SidebarContainer>
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter />
    </SidebarContainer>
  );
}
