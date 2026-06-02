import { useMessagePanelContext } from '@/messenger/messages/state/messagePanelContext';

export type MessageSendHandler = (text: string) => void;

export function useMessageSendHandler(): MessageSendHandler {
  const { sendMessage } = useMessagePanelContext();
  return (text: string) => {
    void sendMessage(text);
  };
}
