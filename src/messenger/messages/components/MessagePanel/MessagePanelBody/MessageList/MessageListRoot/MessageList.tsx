import type { ReactElement, ReactNode, RefObject } from 'react';

import { useScrollToBottom } from '@/messenger/messages/hooks/useScrollToBottom';
import { useMessagePanelContext } from '@/messenger/messages/state/messagePanelContext';
import { toMessageRowView } from '@/messenger/messages/utils/messageViewUtils';
import { MessageItem } from '@/messenger/messages/components/MessagePanel/MessagePanelBody/MessageList/MessageItem/MessageItem';

type MessageScrollContainerProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

function MessageScrollContainer({
  scrollRef,
  children,
}: MessageScrollContainerProps): ReactElement {
  return (
    <div ref={scrollRef} className="message-list" role="log" aria-live="polite">
      {children}
    </div>
  );
}

export function MessageList(): ReactElement | null {
  const { view } = useMessagePanelContext();
  const messageCount = view.kind === 'list' ? view.messages.length : 0;
  const scrollRef = useScrollToBottom<HTMLDivElement>([messageCount]);

  if (view.kind !== 'list') {
    return null;
  }

  return (
    <MessageScrollContainer scrollRef={scrollRef}>
      {view.messages.map((message) => (
        <MessageItem key={message.id} row={toMessageRowView(message, view.currentUserId)} />
      ))}
    </MessageScrollContainer>
  );
}
