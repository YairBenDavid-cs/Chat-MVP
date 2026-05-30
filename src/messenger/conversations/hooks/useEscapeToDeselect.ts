import { useEffect } from 'react';

import { useConversations } from '@/messenger/conversations/hooks/useConversations';

export function useEscapeToDeselect(): void {
  const { selectedId, deselectConversation } = useConversations();

  useEffect(() => {
    if (selectedId === null) {
      return;
    }
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key !== 'Escape') {
        return;
      }
      deselectConversation();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId, deselectConversation]);
}
