import type { ReactElement } from 'react';

import { LoginScreen } from '@/login/components/LoginScreen/LoginScreen';
import { useAuth } from '@/login/hooks/useAuth';
import { useAuthBootstrap } from '@/login/hooks/useAuthBootstrap';
import { ConversationList } from '@/messenger/conversations/components/ConversationList/ConversationList';
import { MessagePanel } from '@/messenger/messages/components/MessagePanel/MessagePanel';
import { useChat } from '@/messenger/chat/hooks/useChat';
import { ChatLayout } from '@/messenger/chat/components/ChatPage/ChatLayout/ChatLayout';

export function ChatPage(): ReactElement {
  useAuthBootstrap();
  const { user } = useAuth();
  useChat();

  if (user === null) {
    return <LoginScreen />;
  }

  return (
    <ChatLayout
      sidebar={<ConversationList />}
      main={<MessagePanel />}
    />
  );
}
