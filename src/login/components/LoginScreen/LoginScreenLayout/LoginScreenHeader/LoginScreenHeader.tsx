import type { ReactElement, ReactNode } from 'react';

import { LoginDemoHint } from '@/login/components/LoginScreen/LoginScreenLayout/LoginScreenHeader/LoginDemoHint';
import { LoginScreenHeading } from '@/login/components/LoginScreen/LoginScreenLayout/LoginScreenHeader/LoginScreenHeading';

type LoginScreenHeaderContainerProps = {
  children: ReactNode;
};

function LoginScreenHeaderContainer({
  children,
}: LoginScreenHeaderContainerProps): ReactElement {
  return <header className="auth-screen-header">{children}</header>;
}

export function LoginScreenHeader(): ReactElement {
  return (
    <LoginScreenHeaderContainer>
      <LoginScreenHeading />
      <LoginDemoHint />
    </LoginScreenHeaderContainer>
  );
}
