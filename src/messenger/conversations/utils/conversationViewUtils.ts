import type { Status } from '@/messenger/chat/types/chatStateTypes';
import type { Conversation, ConversationId } from '@/messenger/conversations/types/conversationTypes';
import type { ConversationListView, ConversationRowView } from '@/messenger/conversations/types/conversationViewTypes';
import { filterConversationsByQuery } from '@/messenger/conversations/utils/conversationSearchUtils';

const FALLBACK_INITIAL = '?';

export function getConversationInitial(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return FALLBACK_INITIAL;
  }
  return trimmed.charAt(0).toUpperCase();
}

export function formatConversationTimestamp(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const isSameDay = date.toDateString() === now.toDateString();
  if (isSameDay) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function getConversationListItemClassName(isSelected: boolean): string {
  const base = 'conversation-list-item';
  return isSelected ? `${base} conversation-list-item-selected` : base;
}

export function toConversationRowView(conversation: Conversation): ConversationRowView {
  const displayName = conversation.title;
  return {
    id: conversation.id,
    displayName,
    avatarUrl: conversation.avatarUrl,
    initial: getConversationInitial(displayName),
    previewText: conversation.lastMessagePreview,
    formattedTimestamp: formatConversationTimestamp(conversation.lastMessageAt),
    unreadCount: conversation.unreadCount,
  };
}

export function resolveConversationListView(
  status: Status,
  conversations: Conversation[],
  selectedId: ConversationId | null,
  onSelect: (id: ConversationId) => void,
  query: string,
  onQueryChange: (value: string) => void,
): ConversationListView {
  if (status === 'loading') {
    return { kind: 'loading' };
  }
  if (status === 'error') {
    return { kind: 'error' };
  }
  if (conversations.length === 0) {
    return { kind: 'empty' };
  }
  const filtered = filterConversationsByQuery(conversations, query);
  if (filtered.length === 0) {
    return { kind: 'noResults', query, onQueryChange };
  }
  return {
    kind: 'list',
    rows: filtered.map(toConversationRowView),
    selectedId,
    onSelect,
    query,
    onQueryChange,
  };
}
