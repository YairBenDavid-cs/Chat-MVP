import type { ReactElement } from 'react';

import { LoadingState } from '@/shared/components/feedback/LoadingState';
import { useAuth } from '@/login/hooks/useAuth';
import { LoginForm } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormRoot/LoginForm';
import { LoginScreenHeader } from '@/login/components/LoginScreen/LoginScreenLayout/LoginScreenHeader/LoginScreenHeader';
import { LoginScreenLayout } from '@/login/components/LoginScreen/LoginScreenLayout/LoginScreenLayoutRoot/LoginScreenLayout';

export function LoginScreen(): ReactElement {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState label="Signing in..." />;
  }

  return (
    <LoginScreenLayout>
      <LoginScreenHeader />
      <LoginForm />
    </LoginScreenLayout>
  );
}
