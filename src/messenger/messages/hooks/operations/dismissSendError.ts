import type { Dispatch } from 'react';

import type { ChatAction } from '@/messenger/chat/state/chatActions';
import { sendErrorDismiss } from '@/messenger/messages/state/messagesSendActions';

export function dismissSendError(dispatch: Dispatch<ChatAction>): void {
  dispatch(sendErrorDismiss());
}
