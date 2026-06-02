import type { ReactElement } from 'react';

import { ErrorState } from '@/shared/components/feedback/ErrorState';

const CONVERSATIONS_LOAD_ERROR = 'Failed to load conversations';

export function ConversationListErrorState(): ReactElement {
  return <ErrorState message={CONVERSATIONS_LOAD_ERROR} />;
}
