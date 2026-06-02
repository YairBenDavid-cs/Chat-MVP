import type { ReactElement } from 'react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { useMessagePanelContext } from '@/messenger/messages/state/messagePanelContext';
import { MessageEmptyState } from '@/messenger/messages/components/MessagePanel/MessagePanelBody/MessageEmptyState/MessageEmptyState';
import { MessageList } from '@/messenger/messages/components/MessagePanel/MessagePanelBody/MessageList/MessageListRoot/MessageList';
import { MessageSkeleton } from '@/messenger/messages/components/MessagePanel/MessagePanelBody/MessageSkeleton/MessageSkeleton';

const MESSAGES_LOAD_ERROR = 'Failed to load messages';

export function MessagePanelBody(): ReactElement {
  const { view } = useMessagePanelContext();

  if (view.kind === 'loading') {
    return <MessageSkeleton />;
  }
  if (view.kind === 'error') {
    return <ErrorState message={MESSAGES_LOAD_ERROR} />;
  }
  if (view.kind === 'noSelection') {
    return <MessageEmptyState hasSelection={false} />;
  }
  if (view.kind === 'empty') {
    return <MessageEmptyState hasSelection />;
  }
  return <MessageList />;
}
