import type { ReactElement } from 'react';

import { useLoginFormContext } from '@/login/state/loginFormContext';

export function LoginError(): ReactElement | null {
  const { errorMessage } = useLoginFormContext();

  if (errorMessage === null) {
    return null;
  }
  return (
    <p className="auth-login-error" role="alert">
      {errorMessage}
    </p>
  );
}
