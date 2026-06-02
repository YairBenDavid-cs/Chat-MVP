export type UserId = string & { readonly __brand: 'UserId' };

export type User = {
  id: UserId;
  username: string;
  avatarUrl: string;
};
