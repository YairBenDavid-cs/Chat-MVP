import type { ReactElement } from 'react';

import { ChatPage } from '@/messenger/chat/components/ChatPage/ChatPageRoot/ChatPage';
import { ChatProvider } from '@/messenger/chat/state/chatContext';

function App(): ReactElement {
  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}

export default App;
