import type { ReactElement, ReactNode } from 'react';

import { LoginSubmitButton } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFooter/LoginSubmitButton';
import { LoginError } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFooter/LoginError';

type LoginFormFooterContainerProps = {
  children: ReactNode;
};

function LoginFormFooterContainer({ children }: LoginFormFooterContainerProps): ReactElement {
  return <div className="auth-form-footer">{children}</div>;
}

export function LoginFormFooter(): ReactElement {
  return (
    <LoginFormFooterContainer>
      <LoginSubmitButton />
      <LoginError />
    </LoginFormFooterContainer>
  );
}
