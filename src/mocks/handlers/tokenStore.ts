import type { AuthToken } from '@/login/types/authTypes';
import type { UserId } from '@/messenger/chat/types/userTypes';
import { findUserById } from '@/mocks/data/mockUsers';

function base64Url(value: string): string {
  return btoa(value).replace(/=+$/u, '').replace(/\+/gu, '-').replace(/\//gu, '_');
}

function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/gu, '+').replace(/_/gu, '/');
  const remainder = normalized.length % 4;
  const padded = remainder === 0 ? normalized : normalized + '='.repeat(4 - remainder);
  return atob(padded);
}

function generateMockJwt(userId: UserId): AuthToken {
  const header = base64Url(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = base64Url(JSON.stringify({ sub: userId, iat: Date.now() }));
  const signature = base64Url(`mock-${userId}-${Date.now()}`);
  return `${header}.${payload}.${signature}` as AuthToken;
}

export function issueToken(userId: UserId): AuthToken {
  return generateMockJwt(userId);
}

export function resolveToken(token: AuthToken): UserId | null {
  try {
    const payload = token.split('.')[1];
    if (payload === undefined) {
      return null;
    }
    const claims = JSON.parse(base64UrlDecode(payload)) as { sub?: unknown };
    if (typeof claims.sub !== 'string') {
      return null;
    }
    return findUserById(claims.sub)?.id ?? null;
  } catch {
    return null;
  }
}
