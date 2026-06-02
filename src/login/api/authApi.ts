import { apiFetch } from '@/shared/api/apiClient';
import type { LoginRequest, LoginResponse } from '@/login/types/authTypes';
import { clearAuthSession, setAuthSession } from '@/shared/auth/authSession';

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  setAuthSession(response.user, response.token);
  return response;
}

export function logout(): void {
  clearAuthSession();
}
