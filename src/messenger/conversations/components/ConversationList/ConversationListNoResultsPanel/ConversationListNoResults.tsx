import type { ReactElement, ReactNode } from 'react';

type ConversationListNoResultsProps = {
  query: string;
};

type NoResultsContainerProps = {
  children: ReactNode;
};

type NoResultsMessageProps = {
  text: string;
};

function NoResultsContainer({ children }: NoResultsContainerProps): ReactElement {
  return (
    <div className="conversation-list-no-results" role="status">
      {children}
    </div>
  );
}

function NoResultsMessage({ text }: NoResultsMessageProps): ReactElement {
  return <p className="conversation-list-no-results-message">{text}</p>;
}

export function ConversationListNoResults({
  query,
}: ConversationListNoResultsProps): ReactElement {
  return (
    <NoResultsContainer>
      <NoResultsMessage text={`No conversations match "${query}"`} />
    </NoResultsContainer>
  );
}
