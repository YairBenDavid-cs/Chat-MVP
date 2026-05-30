import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ChangeEvent, KeyboardEvent } from 'react';

import { useComposer } from '@/messenger/messages/hooks/useComposer';

function changeEvent(value: string): ChangeEvent<HTMLTextAreaElement> {
  return { target: { value } } as unknown as ChangeEvent<HTMLTextAreaElement>;
}

function enterKey(shiftKey: boolean): KeyboardEvent<HTMLTextAreaElement> {
  return {
    key: 'Enter',
    shiftKey,
    preventDefault: vi.fn(),
  } as unknown as KeyboardEvent<HTMLTextAreaElement>;
}

describe('useComposer', () => {
  it('submits the trimmed text when Enter is pressed without Shift', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useComposer({ onSend }));

    act(() => result.current.handleChange(changeEvent('  hello  ')));
    act(() => result.current.handleKeyDown(enterKey(false)));

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend).toHaveBeenCalledWith('hello');
    // input clears after a successful send
    expect(result.current.text).toBe('');
  });

  it('does not submit on Shift+Enter (newline instead)', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useComposer({ onSend }));

    act(() => result.current.handleChange(changeEvent('multi')));
    act(() => result.current.handleKeyDown(enterKey(true)));

    expect(onSend).not.toHaveBeenCalled();
    expect(result.current.text).toBe('multi');
  });

  it('does not submit empty or whitespace-only input', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useComposer({ onSend }));

    act(() => result.current.handleChange(changeEvent('   ')));
    expect(result.current.canSend).toBe(false);

    act(() => result.current.handleKeyDown(enterKey(false)));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('does not submit while disabled', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useComposer({ onSend, disabled: true }));

    act(() => result.current.handleChange(changeEvent('ready')));
    act(() => result.current.handleKeyDown(enterKey(false)));

    expect(result.current.canSend).toBe(false);
    expect(onSend).not.toHaveBeenCalled();
  });
});
