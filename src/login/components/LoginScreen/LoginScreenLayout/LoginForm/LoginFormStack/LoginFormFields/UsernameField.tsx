import type { ReactElement } from 'react';

import { LoginField } from '@/login/components/LoginScreen/LoginScreenLayout/LoginForm/LoginFormStack/LoginFormFields/LoginField/LoginField';

export function UsernameField(): ReactElement {
  return <LoginField kind="username" />;
}
