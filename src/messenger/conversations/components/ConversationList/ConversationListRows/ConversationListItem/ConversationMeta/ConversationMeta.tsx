import type { ReactElement, ReactNode } from 'react';

export type ConversationMetaProps = {
  children: ReactNode;
};

export function ConversationMeta({ children }: ConversationMetaProps): ReactElement {
  return <span className="conversation-meta">{children}</span>;
}
