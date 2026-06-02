import type { FormEvent } from 'react';

import type { LoginFormContextValue } from '@/login/state/loginFormContext';
import { useAuth } from '@/login/hooks/useAuth';
import { useLoginCredentials } from '@/login/hooks/useLoginCredentials';

export type UseLoginFormResult = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formValue: LoginFormContextValue;
};

export function useLoginForm(): UseLoginFormResult {
  const { login, isLoading, error } = useAuth();
  const {
    username,
    password,
    canSubmit,
    handleUsernameChange,
    handlePasswordChange,
    toLoginRequest,
  } = useLoginCredentials();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!canSubmit || isLoading) {
      return;
    }
    void login(toLoginRequest());
  }

  const formValue: LoginFormContextValue = {
    username,
    password,
    disabled: isLoading,
    submitDisabled: isLoading || !canSubmit,
    errorMessage: error?.message ?? null,
    onUsernameChange: handleUsernameChange,
    onPasswordChange: handlePasswordChange,
  };

  return { handleSubmit, formValue };
}
