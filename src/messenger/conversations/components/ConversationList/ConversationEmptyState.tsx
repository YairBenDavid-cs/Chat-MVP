import type { ReactElement, ReactNode } from 'react';

type EmptyStateContainerProps = {
  children: ReactNode;
};

type EmptyStateIconProps = {
  symbol: string;
};

type EmptyStateMessageProps = {
  text: string;
};

const EMPTY_ICON_SYMBOL = '💬';
const EMPTY_MESSAGE_TEXT = 'No conversations yet';

function EmptyStateContainer({ children }: EmptyStateContainerProps): ReactElement {
  return <div className="conversation-empty-state" role="status">{children}</div>;
}

function EmptyStateIcon({ symbol }: EmptyStateIconProps): ReactElement {
  return <span className="conversation-empty-icon" aria-hidden="true">{symbol}</span>;
}

function EmptyStateMessage({ text }: EmptyStateMessageProps): ReactElement {
  return <p className="conversation-empty-message">{text}</p>;
}

export function ConversationEmptyState(): ReactElement {
  return (
    <EmptyStateContainer>
      <EmptyStateIcon symbol={EMPTY_ICON_SYMBOL} />
      <EmptyStateMessage text={EMPTY_MESSAGE_TEXT} />
    </EmptyStateContainer>
  );
}
