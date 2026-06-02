import type { HttpResponse } from 'msw';
import type { UserId } from '@/messenger/chat/types/userTypes';
import type { AuthToken } from '@/login/types/authTypes';
import { unauthorized, type ErrorBody } from '@/mocks/handlers/httpErrors';
import { resolveToken } from '@/mocks/handlers/tokenStore';

const BEARER_PREFIX = 'Bearer ';

type AuthSuccess = { ok: true; userId: UserId };
type AuthFailure = { ok: false; response: HttpResponse<ErrorBody> };
export type AuthResult = AuthSuccess | AuthFailure;

export function requireAuth(request: Request): AuthResult {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith(BEARER_PREFIX)) {
    return { ok: false, response: unauthorized() };
  }
  const token = header.slice(BEARER_PREFIX.length) as AuthToken;
  const userId = resolveToken(token);
  if (!userId) {
    return { ok: false, response: unauthorized() };
  }
  return { ok: true, userId };
}
