import type { ReactElement } from 'react';

import { LOGIN_DEMO_HINT_TEXT } from '@/login/loginDemoCopy';

export function LoginDemoHint(): ReactElement {
  return <p className="auth-demo-hint">{LOGIN_DEMO_HINT_TEXT}</p>;
}
