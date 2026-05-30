import type { ReactElement, ReactNode } from 'react';

import { LoginFormFields } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFields/LoginFormFields';
import { LoginFormFooter } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFooter/LoginFormFooter';

type LoginFormStackContainerProps = {
  children: ReactNode;
};

function LoginFormStackContainer({ children }: LoginFormStackContainerProps): ReactElement {
  return <div className="auth-form-stack">{children}</div>;
}

export function LoginFormStack(): ReactElement {
  return (
    <LoginFormStackContainer>
      <LoginFormFields />
      <LoginFormFooter />
    </LoginFormStackContainer>
  );
}
