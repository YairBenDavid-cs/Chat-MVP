import { useEffect } from 'react';

export function useAutoDismiss(onDismiss: () => void, delayMs: number): void {
  useEffect(() => {
    const timeoutId = window.setTimeout(onDismiss, delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [onDismiss, delayMs]);
}
