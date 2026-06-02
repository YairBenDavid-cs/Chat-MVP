import type { ReactElement } from 'react';

import { LoginField } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFields/LoginField/LoginField';

export function PasswordField(): ReactElement {
  return <LoginField kind="password" />;
}
