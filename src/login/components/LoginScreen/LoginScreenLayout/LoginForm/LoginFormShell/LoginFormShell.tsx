import type { FormEvent, ReactElement, ReactNode } from 'react';

export type LoginFormShellProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export function LoginFormShell({ onSubmit, children }: LoginFormShellProps): ReactElement {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
