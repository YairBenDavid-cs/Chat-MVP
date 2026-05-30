import type { ReactElement, ReactNode } from 'react';

export type LoginScreenLayoutProps = {
  children: ReactNode;
};

export function LoginScreenLayout({ children }: LoginScreenLayoutProps): ReactElement {
  return <div className="auth-screen">{children}</div>;
}
