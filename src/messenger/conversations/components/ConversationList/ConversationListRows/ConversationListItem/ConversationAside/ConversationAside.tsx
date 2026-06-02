import type { ReactElement, ReactNode } from 'react';

export type ConversationAsideProps = {
  children: ReactNode;
};

export function ConversationAside({ children }: ConversationAsideProps): ReactElement {
  return <span className="conversation-aside">{children}</span>;
}
