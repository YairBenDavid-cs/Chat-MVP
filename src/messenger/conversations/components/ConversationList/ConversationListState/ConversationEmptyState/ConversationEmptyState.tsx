import type { ReactElement } from 'react';

import { StatusPanel } from '@/shared/components/feedback/StatusPanel';

const EMPTY_ICON_SYMBOL = '💬';
const EMPTY_MESSAGE_TEXT = 'No conversations yet';

export function ConversationEmptyState(): ReactElement {
  return (
    <StatusPanel
      className="conversation-empty-state"
      icon={EMPTY_ICON_SYMBOL}
      message={EMPTY_MESSAGE_TEXT}
    />
  );
}
