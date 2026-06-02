import type { ReactElement, ReactNode } from 'react';

import { useComposerContext } from '@/messenger/messages/state/composerContext';

export type ComposerFormProps = {
  children: ReactNode;
};

export function ComposerForm({ children }: ComposerFormProps): ReactElement {
  const { handleSubmit } = useComposerContext();
  return (
    <form className="composer-form" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
