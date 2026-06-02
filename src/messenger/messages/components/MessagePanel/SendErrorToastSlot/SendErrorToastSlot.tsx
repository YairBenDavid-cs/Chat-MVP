import type { ReactElement } from 'react';

import { ErrorToast } from '@/shared/components/feedback/ErrorToast';
import { useMessagePanelContext } from '@/messenger/messages/state/messagePanelContext';

export function SendErrorToastSlot(): ReactElement | null {
  const { sendError, dismissSendError } = useMessagePanelContext();
  if (sendError === null) {
    return null;
  }
  return <ErrorToast message={sendError.message} onDismiss={dismissSendError} />;
}
