import type { ReactElement, ReactNode } from 'react';

import { useAuth } from '@/login/hooks/useAuth';
import { LogoutButton } from '@/messenger/chat/components/ChatPage/ChatLayout/SidebarPanel/SidebarFooter/LogoutButton/LogoutButton';

type SidebarFooterContainerProps = {
  children: ReactNode;
};

function SidebarFooterContainer({ children }: SidebarFooterContainerProps): ReactElement {
  return <footer className="sidebar-footer">{children}</footer>;
}

export function SidebarFooter(): ReactElement {
  const { logout } = useAuth();

  return (
    <SidebarFooterContainer>
      <LogoutButton onClick={logout} />
    </SidebarFooterContainer>
  );
}
