import type { ReactElement } from 'react';

import { useConversationListContext } from '@/messenger/conversations/state/conversationListContext';
import {
  ConversationRowProvider,
  type ConversationRowContextValue,
} from '@/messenger/conversations/state/conversationRowContext';
import type { ConversationRowView } from '@/messenger/conversations/types/conversationViewTypes';
import { ConversationAside } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListItem/ConversationAside/ConversationAside';
import { ConversationAvatar } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListItem/ConversationAvatar/ConversationAvatar';
import { ConversationItemContainer } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListItem/ConversationItemContainer/ConversationItemContainer';
import { ConversationMeta } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListItem/ConversationMeta/ConversationMeta';
import { ConversationName } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListItem/ConversationMeta/ConversationName';
import { ConversationPreview } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListItem/ConversationMeta/ConversationPreview';
import { ConversationTimestamp } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListItem/ConversationAside/ConversationTimestamp';
import { ConversationUnreadBadge } from '@/messenger/conversations/components/ConversationList/ConversationListRows/ConversationListItem/ConversationAside/ConversationUnreadBadge';

export type ConversationListItemProps = {
  row: ConversationRowView;
};

export function ConversationListItem({ row }: ConversationListItemProps): ReactElement {
  const { selectedId, onSelect } = useConversationListContext();
  const value: ConversationRowContextValue = {
    row,
    isSelected: row.id === selectedId,
    onSelect: () => onSelect(row.id),
  };
  return (
    <ConversationRowProvider value={value}>
      <ConversationItemContainer>
        <ConversationAvatar />
        <ConversationMeta>
          <ConversationName />
          <ConversationPreview />
        </ConversationMeta>
        <ConversationAside>
          <ConversationTimestamp />
          <ConversationUnreadBadge />
        </ConversationAside>
      </ConversationItemContainer>
    </ConversationRowProvider>
  );
}
