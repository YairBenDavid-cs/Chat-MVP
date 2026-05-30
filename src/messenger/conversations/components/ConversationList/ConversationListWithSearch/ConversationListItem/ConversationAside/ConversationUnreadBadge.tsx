import type { ReactElement } from 'react';

import { useConversationRowContext } from '@/messenger/conversations/state/conversationRowContext';

export function ConversationUnreadBadge(): ReactElement | null {
  const { row } = useConversationRowContext();
  if (row.unreadCount <= 0) {
    return null;
  }
  return (
    <span className="conversation-unread-badge" aria-label={`${row.unreadCount} unread`}>
      {row.unreadCount}
    </span>
  );
}
