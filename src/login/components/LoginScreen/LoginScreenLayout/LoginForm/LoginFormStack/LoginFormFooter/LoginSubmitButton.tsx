import type { ReactElement } from 'react';

import { useLoginFormContext } from '@/login/state/loginFormContext';

export function LoginSubmitButton(): ReactElement {
  const { submitDisabled } = useLoginFormContext();

  return (
    <button type="submit" className="auth-submit-button" disabled={submitDisabled}>
      Sign in
    </button>
  );
}
