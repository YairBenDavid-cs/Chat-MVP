import type { LoginFieldKind } from '@/login/state/loginFormContext';

export type LoginFieldConfig = {
  id: string;
  label: string;
  type: 'text' | 'password';
  autoComplete: string;
};

const USERNAME_CONFIG: LoginFieldConfig = {
  id: 'login-username',
  label: 'Username',
  type: 'text',
  autoComplete: 'username',
};

const PASSWORD_CONFIG: LoginFieldConfig = {
  id: 'login-password',
  label: 'Password',
  type: 'password',
  autoComplete: 'current-password',
};

export function getLoginFieldConfig(kind: LoginFieldKind): LoginFieldConfig {
  if (kind === 'username') {
    return USERNAME_CONFIG;
  }
  return PASSWORD_CONFIG;
}
