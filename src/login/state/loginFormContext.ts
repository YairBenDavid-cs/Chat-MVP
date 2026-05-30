import {
  createContext,
  createElement,
  useContext,
  type ChangeEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

export type LoginFieldKind = 'username' | 'password';

export type LoginFormContextValue = {
  username: string;
  password: string;
  disabled: boolean;
  submitDisabled: boolean;
  errorMessage: string | null;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const LoginFormContext = createContext<LoginFormContextValue | null>(null);

export type LoginFormProviderProps = {
  value: LoginFormContextValue;
  children: ReactNode;
};

export function LoginFormProvider({
  value,
  children,
}: LoginFormProviderProps): ReactElement {
  return createElement(LoginFormContext.Provider, { value }, children);
}

export function useLoginFormContext(): LoginFormContextValue {
  const ctx = useContext(LoginFormContext);
  if (ctx === null) {
    throw new Error('useLoginFormContext must be used inside <LoginFormProvider>');
  }
  return ctx;
}
