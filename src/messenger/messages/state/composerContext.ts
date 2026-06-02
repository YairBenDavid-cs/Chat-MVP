import {
  createContext,
  createElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react';

import { useComposer, type UseComposerResult } from '@/messenger/messages/hooks/useComposer';
import { useMessagePanelContext } from '@/messenger/messages/state/messagePanelContext';

export type ComposerContextValue = UseComposerResult & {
  disabled: boolean;
};

const ComposerContext = createContext<ComposerContextValue | null>(null);

export type ComposerProviderProps = {
  children: ReactNode;
};

export function ComposerProvider({ children }: ComposerProviderProps): ReactElement {
  const { sendMessage, isComposerDisabled } = useMessagePanelContext();
  const composer = useComposer({
    onSend: (text: string) => {
      void sendMessage(text);
    },
    disabled: isComposerDisabled,
  });
  const value: ComposerContextValue = {
    ...composer,
    disabled: isComposerDisabled,
  };
  return createElement(ComposerContext.Provider, { value }, children);
}

export function useComposerContext(): ComposerContextValue {
  const ctx = useContext(ComposerContext);
  if (ctx === null) {
    throw new Error('useComposerContext must be used inside <ComposerProvider>');
  }
  return ctx;
}
