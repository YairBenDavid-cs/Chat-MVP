import {
  createContext,
  createElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react';

import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { ConversationListView } from '@/messenger/conversations/types/conversationViewTypes';

export type ConversationListContextValue = {
  selectedId: ConversationId | null;
  onSelect: (id: ConversationId) => void;
  query: string;
  onQueryChange: (value: string) => void;
};

const NOOP_SELECT = (): void => {};

export function toConversationListContextValue(
  view: Extract<ConversationListView, { kind: 'list' | 'noResults' }>,
): ConversationListContextValue {
  if (view.kind === 'list') {
    return {
      selectedId: view.selectedId,
      onSelect: view.onSelect,
      query: view.query,
      onQueryChange: view.onQueryChange,
    };
  }
  return {
    selectedId: null,
    onSelect: NOOP_SELECT,
    query: view.query,
    onQueryChange: view.onQueryChange,
  };
}

const ConversationListContext = createContext<ConversationListContextValue | null>(null);

export type ConversationListProviderProps = {
  value: ConversationListContextValue;
  children: ReactNode;
};

export function ConversationListProvider({
  value,
  children,
}: ConversationListProviderProps): ReactElement {
  return createElement(ConversationListContext.Provider, { value }, children);
}

export function useConversationListContext(): ConversationListContextValue {
  const ctx = useContext(ConversationListContext);
  if (ctx === null) {
    throw new Error(
      'useConversationListContext must be used inside <ConversationListProvider>',
    );
  }
  return ctx;
}
