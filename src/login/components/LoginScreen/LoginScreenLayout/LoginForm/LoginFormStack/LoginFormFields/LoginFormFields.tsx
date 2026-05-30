import type { ReactElement, ReactNode } from 'react';

import { PasswordField } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFields/PasswordField';
import { UsernameField } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFields/UsernameField';

type LoginFormFieldsContainerProps = {
  children: ReactNode;
};

function LoginFormFieldsContainer({ children }: LoginFormFieldsContainerProps): ReactElement {
  return <div className="auth-form-fields">{children}</div>;
}

export function LoginFormFields(): ReactElement {
  return (
    <LoginFormFieldsContainer>
      <UsernameField />
      <PasswordField />
    </LoginFormFieldsContainer>
  );
}
