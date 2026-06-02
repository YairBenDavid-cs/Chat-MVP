import type { ReactElement } from 'react';

import { useLoginFieldBinding } from '@/login/hooks/useLoginFieldBinding';
import { getLoginFieldConfig } from '@/login/utils/loginFieldConfig';
import type { LoginFieldKind } from '@/login/state/loginFormContext';

export type LoginFieldInputProps = {
  kind: LoginFieldKind;
};

export function LoginFieldInput({ kind }: LoginFieldInputProps): ReactElement {
  const { id, type, autoComplete } = getLoginFieldConfig(kind);
  const { value, disabled, onChange } = useLoginFieldBinding(kind);
  return (
    <input
      id={id}
      className="auth-input"
      type={type}
      value={value}
      disabled={disabled}
      autoComplete={autoComplete}
      onChange={onChange}
    />
  );
}
