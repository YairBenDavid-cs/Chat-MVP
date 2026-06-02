import type { ReactElement } from 'react';

import { ConversationListContainer } from '@/messenger/conversations/components/ConversationList/ConversationListContainer/ConversationListContainer';
import { ConversationSkeleton } from '@/messenger/conversations/components/ConversationList/ConversationListState/ConversationListLoadingState/ConversationSkeleton/ConversationSkeleton';

const SKELETON_COUNT = 3;

export function ConversationListLoadingState(): ReactElement {
  return (
    <ConversationListContainer>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <ConversationSkeleton key={index} />
      ))}
    </ConversationListContainer>
  );
}
