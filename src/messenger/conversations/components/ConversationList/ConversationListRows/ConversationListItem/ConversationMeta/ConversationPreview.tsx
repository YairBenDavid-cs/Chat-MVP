import type { ReactElement } from 'react';

import { useConversationRowContext } from '@/messenger/conversations/state/conversationRowContext';

export function ConversationPreview(): ReactElement {
  const { row } = useConversationRowContext();
  return <span className="conversation-preview">{row.previewText}</span>;
}
