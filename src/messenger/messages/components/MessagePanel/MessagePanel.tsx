import type { ReactElement, ReactNode } from 'react';

import { useEscapeToDeselect } from '@/messenger/conversations/hooks/useEscapeToDeselect';
import { MessagePanelProvider } from '@/messenger/messages/state/messagePanelContext';
import { MessageInputSlot } from '@/messenger/messages/components/MessagePanel/MessageInputSlot/MessageInputSlot';
import { MessagePanelBody } from '@/messenger/messages/components/MessagePanel/MessagePanelBody/MessagePanelBody';
import { SendErrorToastSlot } from '@/messenger/messages/components/MessagePanel/SendErrorToastSlot';

type MessagePanelLayoutProps = {
  children: ReactNode;
};

function MessagePanelLayout({ children }: MessagePanelLayoutProps): ReactElement {
  return <section className="message-panel">{children}</section>;
}

export function MessagePanel(): ReactElement {
  useEscapeToDeselect();

  return (
    <MessagePanelProvider>
      <MessagePanelLayout>
        <MessagePanelBody />
        <MessageInputSlot />
        <SendErrorToastSlot />
      </MessagePanelLayout>
    </MessagePanelProvider>
  );
}
