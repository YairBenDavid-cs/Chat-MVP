import type { ReactElement } from 'react';

import { useComposerContext } from '@/messenger/messages/state/composerContext';
import { SendIcon } from '@/messenger/messages/components/MessagePanel/MessageInputSlot/MessageInput/ComposerForm/SendButton/SendIcon';

export function SendButton(): ReactElement {
  const { canSend } = useComposerContext();
  return (
    <button
      type="submit"
      className="send-button"
      disabled={!canSend}
      aria-label="Send message"
    >
      <SendIcon />
    </button>
  );
}
