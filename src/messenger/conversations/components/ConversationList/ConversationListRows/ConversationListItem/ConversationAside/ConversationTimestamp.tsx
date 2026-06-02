import type { ReactElement } from 'react';

import { useConversationRowContext } from '@/messenger/conversations/state/conversationRowContext';

export function ConversationTimestamp(): ReactElement {
  const { row } = useConversationRowContext();
  return <time className="conversation-timestamp">{row.formattedTimestamp}</time>;
}
