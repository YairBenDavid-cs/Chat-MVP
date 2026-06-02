import type { ReactElement } from 'react';

import { ComposerProvider } from '@/messenger/messages/state/composerContext';
import { ComposerForm } from '@/messenger/messages/components/MessagePanel/MessageInputSlot/MessageInput/ComposerForm/ComposerFormRoot/ComposerForm';
import { ComposerTextarea } from '@/messenger/messages/components/MessagePanel/MessageInputSlot/MessageInput/ComposerForm/ComposerTextarea/ComposerTextarea';
import { SendButton } from '@/messenger/messages/components/MessagePanel/MessageInputSlot/MessageInput/ComposerForm/SendButton/SendButton';

export function MessageInput(): ReactElement {
  return (
    <ComposerProvider>
      <ComposerForm>
        <ComposerTextarea />
        <SendButton />
      </ComposerForm>
    </ComposerProvider>
  );
}
