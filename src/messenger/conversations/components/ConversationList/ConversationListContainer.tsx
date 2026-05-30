import type { ReactElement, ReactNode } from 'react';

export type ConversationListContainerProps = {
  children: ReactNode;
};

export function ConversationListContainer({
  children,
}: ConversationListContainerProps): ReactElement {
  return (
    <nav className="conversation-list" aria-label="Conversations">
      {children}
    </nav>
  );
}
