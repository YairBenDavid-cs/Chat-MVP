import type { ReactElement, ReactNode } from 'react';

import { useAutoDismiss } from '@/shared/hooks/useAutoDismiss';

export type ErrorToastProps = {
  message: string;
  onDismiss: () => void;
};

const AUTO_DISMISS_MS = 3000;

type ToastContainerProps = {
  children: ReactNode;
};

type ToastMessageProps = {
  text: string;
};

type DismissButtonProps = {
  onClick: () => void;
};

function ToastContainer({ children }: ToastContainerProps): ReactElement {
  return <div className="error-toast" role="alert">{children}</div>;
}

function ToastMessage({ text }: ToastMessageProps): ReactElement {
  return <span className="error-toast-message">{text}</span>;
}

function DismissButton({ onClick }: DismissButtonProps): ReactElement {
  return (
    <button
      type="button"
      className="error-toast-dismiss"
      aria-label="Dismiss"
      onClick={onClick}
    >
      ×
    </button>
  );
}

export function ErrorToast({ message, onDismiss }: ErrorToastProps): ReactElement {
  useAutoDismiss(onDismiss, AUTO_DISMISS_MS);

  return (
    <ToastContainer>
      <ToastMessage text={message} />
      <DismissButton onClick={onDismiss} />
    </ToastContainer>
  );
}
