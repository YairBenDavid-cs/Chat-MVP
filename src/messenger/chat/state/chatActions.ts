import type { ConversationsAction } from '@/messenger/conversations/state/conversationsActions';
import type { MessagesAction } from '@/messenger/messages/state/messagesActions';
import type { LoginAction } from '@/login/state/loginActions';

export {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  restoreAuth,
} from '@/login/state/loginActions';
export {
  conversationsFetchStart,
  conversationsFetchSuccess,
  conversationsFetchFailure,
  conversationSelect,
  conversationDeselect,
  conversationMarkAsRead,
} from '@/messenger/conversations/state/conversationsActions';
export {
  messagesFetchStart,
  messagesFetchSuccess,
  messagesFetchFailure,
  messageOptimistic,
  messageSendSuccess,
  messageSendFailure,
  sendErrorDismiss,
} from '@/messenger/messages/state/messagesActions';

export type ChatAction = LoginAction | ConversationsAction | MessagesAction;
