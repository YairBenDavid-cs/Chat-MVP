import { useState } from 'react';

export type UseConversationSearchResult = {
  query: string;
  setQuery: (value: string) => void;
};

export function useConversationSearch(): UseConversationSearchResult {
  const [query, setQuery] = useState<string>('');
  return { query, setQuery };
}
