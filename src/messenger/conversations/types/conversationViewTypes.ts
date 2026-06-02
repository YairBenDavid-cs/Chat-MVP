import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';

/** Presentation model for a single sidebar row (see ConversationRowView in architecture). */
export type ConversationRowView = {
  id: ConversationId;
  displayName: string;
  avatarUrl: string;
  initial: string;
  previewText: string;
  formattedTimestamp: string;
  unreadCount: number;
};

export type ConversationListView =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'empty' }
  | {
      kind: 'noResults';
      query: string;
      onQueryChange: (value: string) => void;
    }
  | {
      kind: 'list';
      rows: ConversationRowView[];
      selectedId: ConversationId | null;
      onSelect: (id: ConversationId) => void;
      query: string;
      onQueryChange: (value: string) => void;
    };
