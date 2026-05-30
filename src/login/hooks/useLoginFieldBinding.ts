import type { ChangeEvent } from 'react';

import {
  useLoginFormContext,
  type LoginFieldKind,
} from '@/login/state/loginFormContext';

export type LoginFieldBinding = {
  value: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function useLoginFieldBinding(kind: LoginFieldKind): LoginFieldBinding {
  const ctx = useLoginFormContext();
  if (kind === 'username') {
    return {
      value: ctx.username,
      disabled: ctx.disabled,
      onChange: ctx.onUsernameChange,
    };
  }
  return {
    value: ctx.password,
    disabled: ctx.disabled,
    onChange: ctx.onPasswordChange,
  };
}
