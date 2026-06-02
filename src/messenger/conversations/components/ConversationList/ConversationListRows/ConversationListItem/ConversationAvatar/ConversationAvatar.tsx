import type { ReactElement } from 'react';

import { useConversationRowContext } from '@/messenger/conversations/state/conversationRowContext';

function ConversationAvatarImage({ avatarUrl }: { avatarUrl: string }): ReactElement {
  return (
    <img
      className="conversation-avatar conversation-avatar-image"
      src={avatarUrl}
      alt=""
      aria-hidden="true"
    />
  );
}

function ConversationAvatarInitial({ initial }: { initial: string }): ReactElement {
  return (
    <span className="conversation-avatar conversation-avatar-initial" aria-hidden="true">
      {initial}
    </span>
  );
}

export function ConversationAvatar(): ReactElement {
  const { row } = useConversationRowContext();
  if (row.avatarUrl.length > 0) {
    return <ConversationAvatarImage avatarUrl={row.avatarUrl} />;
  }
  return <ConversationAvatarInitial initial={row.initial} />;
}
