import type { User, UserId } from '@/messenger/chat/types/userTypes';

export const MOCK_USERS: User[] = [
  {
    id: 'u-alice' as UserId,
    username: 'Alice',
    avatarUrl: 'https://i.pravatar.cc/100?u=alice',
  },
  {
    id: 'u-bob' as UserId,
    username: 'Bob',
    avatarUrl: 'https://i.pravatar.cc/100?u=bob',
  },
  {
    id: 'u-carol' as UserId,
    username: 'Carol',
    avatarUrl: 'https://i.pravatar.cc/100?u=carol',
  },
];

export function findUserById(id: string): User | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}

export function findUserByUsername(username: string): User | undefined {
  const normalized = username.trim().toLowerCase();
  return MOCK_USERS.find((u) => u.username.toLowerCase() === normalized);
}
