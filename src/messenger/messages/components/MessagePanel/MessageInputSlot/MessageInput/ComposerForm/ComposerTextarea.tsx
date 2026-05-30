import type { ReactElement } from 'react';

import { useComposerContext } from '@/messenger/messages/state/composerContext';

export function ComposerTextarea(): ReactElement {
  const { text, disabled, handleChange, handleKeyDown } = useComposerContext();
  return (
    <textarea
      className="composer-textarea"
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder="Type a message..."
      rows={1}
    />
  );
}
