import {
  createContext,
  createElement,
  useContext,
  useReducer,
  type Dispatch,
  type ReactElement,
  type ReactNode,
} from 'react';

import type { ChatState } from '@/messenger/chat/types/chatStateTypes';
import type { ChatAction } from '@/messenger/chat/state/chatActions';
import { initialState } from '@/messenger/chat/state/chatInitialState';
import { reducer } from '@/messenger/chat/state/chatReducer';

export type ChatContextValue = {
  state: ChatState;
  dispatch: Dispatch<ChatAction>;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export type ChatProviderProps = {
  children: ReactNode;
};

export function ChatProvider({ children }: ChatProviderProps): ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);
  return createElement(ChatContext.Provider, { value: { state, dispatch } }, children);
}

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (ctx === null) {
    throw new Error('useChatContext must be used inside <ChatProvider>');
  }
  return ctx;
}
