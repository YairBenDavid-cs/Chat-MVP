import type { ReactElement, ReactNode } from 'react';

import { useEscapeToDeselect } from '@/messenger/conversations/hooks/useEscapeToDeselect';
import { MessagePanelProvider } from '@/messenger/messages/state/messagePanelContext';
import { MessageInputSlot } from '@/messenger/messages/components/MessagePanel/MessageInputSlot/MessageInputSlotRoot/MessageInputSlot';
import { MessagePanelBody } from '@/messenger/messages/components/MessagePanel/MessagePanelBody/MessagePanelBodyRoot/MessagePanelBody';
import { SendErrorToastSlot } from '@/messenger/messages/components/MessagePanel/SendErrorToastSlot/SendErrorToastSlot';

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
