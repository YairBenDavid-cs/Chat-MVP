import {
  createContext,
  createElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react';

import type { ConversationRowView } from '@/messenger/conversations/types/conversationViewTypes';

export type ConversationRowContextValue = {
  row: ConversationRowView;
  isSelected: boolean;
  onSelect: () => void;
};

const ConversationRowContext = createContext<ConversationRowContextValue | null>(null);

export type ConversationRowProviderProps = {
  value: ConversationRowContextValue;
  children: ReactNode;
};

export function ConversationRowProvider({
  value,
  children,
}: ConversationRowProviderProps): ReactElement {
  return createElement(ConversationRowContext.Provider, { value }, children);
}

export function useConversationRowContext(): ConversationRowContextValue {
  const ctx = useContext(ConversationRowContext);
  if (ctx === null) {
    throw new Error(
      'useConversationRowContext must be used inside <ConversationRowProvider>',
    );
  }
  return ctx;
}
