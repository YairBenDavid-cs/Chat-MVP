import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorToast } from '@/shared/components/feedback/ErrorToast';

describe('ErrorToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the error message to the user', () => {
    render(<ErrorToast message="Message failed to send" onDismiss={vi.fn()} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Message failed to send');
  });

  it('auto-dismisses after the timeout elapses', () => {
    const onDismiss = vi.fn();
    render(<ErrorToast message="Message failed to send" onDismiss={onDismiss} />);

    expect(onDismiss).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3000);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
