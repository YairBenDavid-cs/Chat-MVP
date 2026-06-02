import type { ReactElement, ReactNode } from 'react';

export type MessageEmptyStateProps = {
  hasSelection: boolean;
};

type EmptyStateContainerProps = {
  children: ReactNode;
};

type EmptyStateIconProps = {
  symbol: string;
};

type EmptyStateMessageProps = {
  text: string;
};

const NO_SELECTION_ICON = '👈';
const NO_MESSAGES_ICON = '👋';
const NO_SELECTION_TEXT = 'Select a conversation to start chatting';
const NO_MESSAGES_TEXT = 'No messages yet — say hello!';

function EmptyStateContainer({ children }: EmptyStateContainerProps): ReactElement {
  return <div className="message-empty-state" role="status">{children}</div>;
}

function EmptyStateIcon({ symbol }: EmptyStateIconProps): ReactElement {
  return <span className="message-empty-icon" aria-hidden="true">{symbol}</span>;
}

function EmptyStateMessage({ text }: EmptyStateMessageProps): ReactElement {
  return <p className="message-empty-message">{text}</p>;
}

function NoSelectionMessageEmpty(): ReactElement {
  return (
    <EmptyStateContainer>
      <EmptyStateIcon symbol={NO_SELECTION_ICON} />
      <EmptyStateMessage text={NO_SELECTION_TEXT} />
    </EmptyStateContainer>
  );
}

function NoMessagesMessageEmpty(): ReactElement {
  return (
    <EmptyStateContainer>
      <EmptyStateIcon symbol={NO_MESSAGES_ICON} />
      <EmptyStateMessage text={NO_MESSAGES_TEXT} />
    </EmptyStateContainer>
  );
}

export function MessageEmptyState({ hasSelection }: MessageEmptyStateProps): ReactElement {
  if (hasSelection) {
    return <NoMessagesMessageEmpty />;
  }
  return <NoSelectionMessageEmpty />;
}
