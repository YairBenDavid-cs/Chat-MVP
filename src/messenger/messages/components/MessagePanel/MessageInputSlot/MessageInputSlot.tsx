import type { ReactElement } from 'react';

import { useMessagePanelContext } from '@/messenger/messages/state/messagePanelContext';
import { MessageInput } from '@/messenger/messages/components/MessagePanel/MessageInputSlot/MessageInput/MessageInput';

export function MessageInputSlot(): ReactElement | null {
  const { view } = useMessagePanelContext();
  if (view.kind === 'noSelection') {
    return null;
  }
  return <MessageInput />;
}
