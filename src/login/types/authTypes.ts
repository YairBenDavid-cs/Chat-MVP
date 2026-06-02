import type { User } from '@/messenger/chat/types/userTypes';

export type AuthToken = string & { readonly __brand: 'AuthToken' };

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: AuthToken;
  user: User;
};
