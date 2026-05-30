import type { Status } from '@/messenger/chat/types/chatStateTypes';
import type { UserId } from '@/messenger/chat/types/userTypes';
import type { MessagePanelView, MessageRowView } from '@/messenger/messages/types/messageViewTypes';
import type { Message } from '@/messenger/messages/types/messageTypes';

export function formatMessageTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function isOwnMessage(message: Message, currentUserId: UserId): boolean {
  return message.senderId === currentUserId;
}

export function getMessageBubbleClassName(isOwn: boolean, isOptimistic: boolean): string {
  const alignment = isOwn ? 'mine' : 'other';
  const optimisticSuffix = isOptimistic ? ' message-bubble-optimistic' : '';
  return `message-bubble message-bubble-${alignment}${optimisticSuffix}`;
}

export function toMessageRowView(message: Message, currentUserId: UserId): MessageRowView {
  const isOwn = isOwnMessage(message, currentUserId);
  const isOptimistic = message.isOptimistic ?? false;
  return {
    id: message.id,
    text: message.text,
    bubbleClassName: getMessageBubbleClassName(isOwn, isOptimistic),
    formattedTime: formatMessageTime(message.createdAt),
  };
}

export function resolveMessagePanelView(
  status: Status,
  messages: Message[],
  currentUserId: UserId | null,
  hasSelection: boolean,
): MessagePanelView {
  if (!hasSelection) {
    return { kind: 'noSelection' };
  }
  if (status === 'loading') {
    return { kind: 'loading' };
  }
  if (status === 'error') {
    return { kind: 'error' };
  }
  if (currentUserId === null) {
    return { kind: 'loading' };
  }
  if (messages.length === 0) {
    return { kind: 'empty' };
  }
  return { kind: 'list', messages, currentUserId };
}
