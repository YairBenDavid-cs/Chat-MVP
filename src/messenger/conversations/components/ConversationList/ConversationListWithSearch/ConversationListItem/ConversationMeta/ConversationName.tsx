import type { ReactElement } from 'react';

import { useConversationRowContext } from '@/messenger/conversations/state/conversationRowContext';

export function ConversationName(): ReactElement {
  const { row } = useConversationRowContext();
  const hasUnread = row.unreadCount > 0;
  const className = hasUnread
    ? 'conversation-name conversation-name-unread'
    : 'conversation-name';
  return <span className={className}>{row.displayName}</span>;
}
