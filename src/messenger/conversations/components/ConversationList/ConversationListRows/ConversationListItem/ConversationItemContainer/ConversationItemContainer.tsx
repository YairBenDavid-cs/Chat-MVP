import type { ReactElement, ReactNode } from 'react';

import { useConversationRowContext } from '@/messenger/conversations/state/conversationRowContext';
import { getConversationListItemClassName } from '@/messenger/conversations/utils/conversationViewUtils';

export type ConversationItemContainerProps = {
  children: ReactNode;
};

export function ConversationItemContainer({
  children,
}: ConversationItemContainerProps): ReactElement {
  const { isSelected, onSelect } = useConversationRowContext();
  const className = getConversationListItemClassName(isSelected);
  return (
    <button
      type="button"
      className={className}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      {children}
    </button>
  );
}
