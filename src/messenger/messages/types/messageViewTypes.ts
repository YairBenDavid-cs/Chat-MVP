import type { UserId } from '@/messenger/chat/types/userTypes';
import type { Message, MessageId } from '@/messenger/messages/types/messageTypes';

export type MessagePanelView =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'noSelection' }
  | { kind: 'empty' }
  | { kind: 'list'; messages: Message[]; currentUserId: UserId };

export type MessageRowView = {
  id: MessageId;
  text: string;
  bubbleClassName: string;
  formattedTime: string;
};
