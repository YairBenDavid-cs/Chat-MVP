import { useEffect, useRef, type RefObject } from 'react';

export function useScrollToBottom<T extends HTMLElement>(
  deps: unknown[],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }, deps);

  return ref;
}
