import type { ChangeEvent, ReactElement, ReactNode } from 'react';

import { useConversationListContext } from '@/messenger/conversations/state/conversationListContext';

type ConversationSearchBarContainerProps = {
  children: ReactNode;
};

type ConversationSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SEARCH_PLACEHOLDER = 'Search conversations';
const SEARCH_ICON_SYMBOL = '🔍';

function ConversationSearchBarContainer({
  children,
}: ConversationSearchBarContainerProps): ReactElement {
  return <div className="conversation-search-bar">{children}</div>;
}

function ConversationSearchIcon(): ReactElement {
  return (
    <span className="conversation-search-icon" aria-hidden="true">
      {SEARCH_ICON_SYMBOL}
    </span>
  );
}

function ConversationSearchInput({
  value,
  onChange,
}: ConversationSearchInputProps): ReactElement {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }
  return (
    <input
      type="search"
      className="conversation-search-input"
      placeholder={SEARCH_PLACEHOLDER}
      aria-label={SEARCH_PLACEHOLDER}
      value={value}
      onChange={handleChange}
    />
  );
}

export function ConversationSearchBar(): ReactElement {
  const { query, onQueryChange } = useConversationListContext();
  return (
    <ConversationSearchBarContainer>
      <ConversationSearchIcon />
      <ConversationSearchInput value={query} onChange={onQueryChange} />
    </ConversationSearchBarContainer>
  );
}
