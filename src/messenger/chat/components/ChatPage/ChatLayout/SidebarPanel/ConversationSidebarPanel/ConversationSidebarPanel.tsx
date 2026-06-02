import type { ReactElement, ReactNode } from 'react';

type ConversationSidebarPanelProps = {
  children: ReactNode;
};

export function ConversationSidebarPanel({
  children,
}: ConversationSidebarPanelProps): ReactElement {
  return (
    <section className="conversation-sidebar-panel" aria-label="Conversations">
      {children}
    </section>
  );
}
