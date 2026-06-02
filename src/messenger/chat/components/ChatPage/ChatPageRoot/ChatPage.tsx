import type { ReactElement } from 'react';

import { LoginScreen } from '@/login/components/LoginScreen/LoginScreenRoot/LoginScreen';
import { useAuth } from '@/login/hooks/useAuth';
import { useAuthBootstrap } from '@/login/hooks/useAuthBootstrap';
import { MessagePanel } from '@/messenger/messages/components/MessagePanel/MessagePanelRoot/MessagePanel';
import { useChat } from '@/messenger/chat/hooks/useChat';
import { ChatLayout } from '@/messenger/chat/components/ChatPage/ChatLayout/ChatLayoutRoot/ChatLayout';

export function ChatPage(): ReactElement {
  useAuthBootstrap();
  const { user } = useAuth();
  useChat();

  if (user === null) {
    return <LoginScreen />;
  }

  return <ChatLayout main={<MessagePanel />} />;
}
