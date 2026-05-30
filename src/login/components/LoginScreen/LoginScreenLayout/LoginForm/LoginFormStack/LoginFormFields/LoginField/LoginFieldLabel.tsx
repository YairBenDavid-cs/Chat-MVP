import type { ReactElement } from 'react';

import { getLoginFieldConfig } from '@/login/utils/loginFieldConfig';
import type { LoginFieldKind } from '@/login/state/loginFormContext';

export type LoginFieldLabelProps = {
  kind: LoginFieldKind;
};

export function LoginFieldLabel({ kind }: LoginFieldLabelProps): ReactElement {
  const { id, label } = getLoginFieldConfig(kind);
  return (
    <label className="auth-label" htmlFor={id}>
      {label}
    </label>
  );
}
