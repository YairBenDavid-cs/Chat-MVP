import { useState, type ChangeEvent } from 'react';

import type { LoginRequest } from '@/login/types/authTypes';

export type UseLoginCredentialsResult = {
  username: string;
  password: string;
  canSubmit: boolean;
  handleUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toLoginRequest: () => LoginRequest;
};

export function useLoginCredentials(): UseLoginCredentialsResult {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = username.trim().length > 0 && password.length > 0;

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function toLoginRequest(): LoginRequest {
    return { username: username.trim(), password };
  }

  return {
    username,
    password,
    canSubmit,
    handleUsernameChange,
    handlePasswordChange,
    toLoginRequest,
  };
}
