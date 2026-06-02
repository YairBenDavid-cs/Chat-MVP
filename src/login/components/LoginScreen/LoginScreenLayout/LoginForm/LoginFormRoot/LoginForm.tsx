import type { ReactElement } from 'react';

import { useLoginForm } from '@/login/hooks/useLoginForm';
import { LoginFormProvider } from '@/login/state/loginFormContext';
import { LoginFormShell } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormShell/LoginFormShell';
import { LoginFormStack } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormStackRoot/LoginFormStack';

export function LoginForm(): ReactElement {
  const { handleSubmit, formValue } = useLoginForm();

  return (
    <LoginFormShell onSubmit={handleSubmit}>
      <LoginFormProvider value={formValue}>
        <LoginFormStack />
      </LoginFormProvider>
    </LoginFormShell>
  );
}
