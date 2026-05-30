import type { ReactElement, ReactNode } from 'react';

import type { LoginFieldKind } from '@/login/state/loginFormContext';
import { LoginFieldInput } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFields/LoginField/LoginFieldInput';
import { LoginFieldLabel } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFields/LoginField/LoginFieldLabel';

export type LoginFieldProps = {
  kind: LoginFieldKind;
};

type LoginFieldLayoutProps = {
  children: ReactNode;
};

function LoginFieldLayout({ children }: LoginFieldLayoutProps): ReactElement {
  return <div className="auth-field">{children}</div>;
}

export function LoginField({ kind }: LoginFieldProps): ReactElement {
  return (
    <LoginFieldLayout>
      <LoginFieldLabel kind={kind} />
      <LoginFieldInput kind={kind} />
    </LoginFieldLayout>
  );
}
