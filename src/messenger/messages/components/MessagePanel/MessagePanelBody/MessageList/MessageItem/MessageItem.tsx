import type { ReactElement, ReactNode } from 'react';
import type { MessageRowView } from '@/messenger/messages/types/messageViewTypes';

export type MessageItemProps = {
  row: MessageRowView;
};

type MessageBubbleProps = {
  className: string;
  children: ReactNode;
};

type MessageTextProps = {
  text: string;
};

type MessageTimestampProps = {
  formattedTime: string;
};

function MessageBubble({ className, children }: MessageBubbleProps): ReactElement {
  return <div className={className}>{children}</div>;
}

function MessageText({ text }: MessageTextProps): ReactElement {
  return <p className="message-text">{text}</p>;
}

function MessageTimestamp({ formattedTime }: MessageTimestampProps): ReactElement {
  return <time className="message-timestamp">{formattedTime}</time>;
}

export function MessageItem({ row }: MessageItemProps): ReactElement {
  return (
    <MessageBubble className={row.bubbleClassName}>
      <MessageText text={row.text} />
      <MessageTimestamp formattedTime={row.formattedTime} />
    </MessageBubble>
  );
}
