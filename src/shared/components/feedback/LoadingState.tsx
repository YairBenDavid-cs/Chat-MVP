import type { ReactElement, ReactNode } from 'react';

export type LoadingStateProps = {
  label?: string;
};

type LoadingStateContainerProps = {
  children: ReactNode;
};

type LoadingLabelProps = {
  text: string;
};

function Spinner(): ReactElement {
  return <div className="loading-spinner" role="status" aria-label="Loading" />;
}

function LoadingLabel({ text }: LoadingLabelProps): ReactElement {
  return <span className="loading-label">{text}</span>;
}

function LoadingStateContainer({ children }: LoadingStateContainerProps): ReactElement {
  return <div className="loading-state">{children}</div>;
}

function LoadingStateDefault(): ReactElement {
  return (
    <LoadingStateContainer>
      <Spinner />
    </LoadingStateContainer>
  );
}

type LoadingStateWithLabelProps = {
  label: string;
};

function LoadingStateWithLabel({ label }: LoadingStateWithLabelProps): ReactElement {
  return (
    <LoadingStateContainer>
      <Spinner />
      <LoadingLabel text={label} />
    </LoadingStateContainer>
  );
}

export function LoadingState({ label }: LoadingStateProps): ReactElement {
  if (label !== undefined) {
    return <LoadingStateWithLabel label={label} />;
  }
  return <LoadingStateDefault />;
}
