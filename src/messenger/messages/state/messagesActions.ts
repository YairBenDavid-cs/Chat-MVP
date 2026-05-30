import type {
  MessagesFetchFailureAction,
  MessagesFetchStartAction,
  MessagesFetchSuccessAction,
} from '@/messenger/messages/state/messagesFetchActions';
import type {
  MessageSendFailureAction,
  MessageSendOptimisticAction,
  MessageSendSuccessAction,
  SendErrorDismissAction,
} from '@/messenger/messages/state/messagesSendActions';

export {
  messagesFetchStart,
  messagesFetchSuccess,
  messagesFetchFailure,
} from '@/messenger/messages/state/messagesFetchActions';
export {
  messageOptimistic,
  messageSendSuccess,
  messageSendFailure,
  sendErrorDismiss,
} from '@/messenger/messages/state/messagesSendActions';

export type MessagesAction =
  | MessagesFetchStartAction
  | MessagesFetchSuccessAction
  | MessagesFetchFailureAction
  | MessageSendOptimisticAction
  | MessageSendSuccessAction
  | MessageSendFailureAction
  | SendErrorDismissAction;
