import { http, HttpResponse } from 'msw';
import type { LoginRequest, LoginResponse } from '@/login/types/authTypes';
import { verifyPassword } from '@/mocks/data/mockCredentials';
import { findUserByUsername } from '@/mocks/data/mockUsers';
import { badRequest, notFound, unauthorized } from '@/mocks/handlers/httpErrors';
import { issueToken } from '@/mocks/handlers/tokenStore';

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const body = (await request.json().catch(() => null)) as Partial<LoginRequest> | null;
    const username = body?.username;
    const password = body?.password;
    if (
      typeof username !== 'string' ||
      username.trim().length === 0 ||
      typeof password !== 'string' ||
      password.length === 0
    ) {
      return badRequest('Username and password are required');
    }
    const user = findUserByUsername(username);
    if (!user) {
      return notFound('User not found');
    }
    if (!verifyPassword(username, password)) {
      return unauthorized('Incorrect password');
    }
    const token = issueToken(user.id);
    const response: LoginResponse = { token, user };
    return HttpResponse.json(response);
  }),
];
