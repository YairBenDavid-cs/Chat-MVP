import type { ReactElement, ReactNode } from 'react';

export type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

type ErrorStateContainerProps = {
  children: ReactNode;
};

type ErrorMessageProps = {
  text: string;
};

type RetryButtonProps = {
  onClick: () => void;
};

function ErrorStateContainer({ children }: ErrorStateContainerProps): ReactElement {
  return <div className="error-state" role="alert">{children}</div>;
}

function ErrorMessage({ text }: ErrorMessageProps): ReactElement {
  return <p className="error-message">{text}</p>;
}

function RetryButton({ onClick }: RetryButtonProps): ReactElement {
  return (
    <button type="button" className="retry-button" onClick={onClick}>
      Retry
    </button>
  );
}

type ErrorStateContentProps = {
  message: string;
};

function ErrorStateWithoutRetry({ message }: ErrorStateContentProps): ReactElement {
  return (
    <ErrorStateContainer>
      <ErrorMessage text={message} />
    </ErrorStateContainer>
  );
}

type ErrorStateWithRetryProps = ErrorStateContentProps & {
  onRetry: () => void;
};

function ErrorStateWithRetry({ message, onRetry }: ErrorStateWithRetryProps): ReactElement {
  return (
    <ErrorStateContainer>
      <ErrorMessage text={message} />
      <RetryButton onClick={onRetry} />
    </ErrorStateContainer>
  );
}

export function ErrorState({ message, onRetry }: ErrorStateProps): ReactElement {
  if (onRetry !== undefined) {
    return <ErrorStateWithRetry message={message} onRetry={onRetry} />;
  }
  return <ErrorStateWithoutRetry message={message} />;
}
