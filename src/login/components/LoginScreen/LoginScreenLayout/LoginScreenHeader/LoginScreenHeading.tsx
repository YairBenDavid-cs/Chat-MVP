import type { ReactElement } from 'react';

import { LOGIN_HEADING_TEXT } from '@/login/components/LoginScreen/LoginScreenLayout/LoginScreenHeader/loginDemoCopy';

export function LoginScreenHeading(): ReactElement {
  return <h1 className="auth-heading">{LOGIN_HEADING_TEXT}</h1>;
}
