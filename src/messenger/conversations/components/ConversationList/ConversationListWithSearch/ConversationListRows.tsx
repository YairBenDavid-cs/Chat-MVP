import type { ReactElement } from 'react';

import type { ConversationRowView } from '@/messenger/conversations/types/conversationViewTypes';
import { ConversationListContainer } from '@/messenger/conversations/components/ConversationList/ConversationListContainer';
import { ConversationListItem } from '@/messenger/conversations/components/ConversationList/ConversationListWithSearch/ConversationListItem/ConversationListItem';

export type ConversationListRowsProps = {
  rows: ConversationRowView[];
};

export function ConversationListRows({ rows }: ConversationListRowsProps): ReactElement {
  return (
    <ConversationListContainer>
      {rows.map((row) => (
        <ConversationListItem key={row.id} row={row} />
      ))}
    </ConversationListContainer>
  );
}
