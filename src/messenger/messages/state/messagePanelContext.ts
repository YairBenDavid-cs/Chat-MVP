import {
  createContext,
  createElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react';

import { useMessagePanelView, type UseMessagePanelViewResult } from '@/messenger/messages/hooks/useMessagePanelView';

export type MessagePanelContextValue = UseMessagePanelViewResult;

const MessagePanelContext = createContext<MessagePanelContextValue | null>(null);

export type MessagePanelProviderProps = {
  children: ReactNode;
};

export function MessagePanelProvider({
  children,
}: MessagePanelProviderProps): ReactElement {
  const value = useMessagePanelView();
  return createElement(MessagePanelContext.Provider, { value }, children);
}

export function useMessagePanelContext(): MessagePanelContextValue {
  const ctx = useContext(MessagePanelContext);
  if (ctx === null) {
    throw new Error('useMessagePanelContext must be used inside <MessagePanelProvider>');
  }
  return ctx;
}
