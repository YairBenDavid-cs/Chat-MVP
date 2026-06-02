import type { ReactElement } from 'react';

import { StatusPanel } from '@/shared/components/feedback/StatusPanel';

type ConversationListNoResultsProps = {
  query: string;
};

export function ConversationListNoResults({
  query,
}: ConversationListNoResultsProps): ReactElement {
  return (
    <StatusPanel
      className="conversation-list-no-results"
      message={`No conversations match "${query}"`}
    />
  );
}
