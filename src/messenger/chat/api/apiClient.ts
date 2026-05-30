import { getAuthToken } from '@/login/api/authToken';
import type { Error as ChatError } from '@/messenger/chat/types/chatStateTypes';

function isJsonBodyMethod(method: string): boolean {
  return method === 'POST' || method === 'PUT' || method === 'PATCH';
}

function buildHeaders(method: string, init?: RequestInit): Headers {
  const headers = new Headers(init?.headers);
  const authToken = getAuthToken();
  if (authToken !== null && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  if (isJsonBodyMethod(method) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  return headers;
}

async function parseError(response: Response): Promise<ChatError> {
  try {
    const body = (await response.json()) as Partial<ChatError>;
    if (typeof body.code === 'string' && typeof body.message === 'string') {
      return { code: body.code, message: body.message };
    }
  } catch {
    // fall through to generic error
  }
  return {
    code: `HTTP_${response.status}`,
    message: response.statusText || 'Request failed',
  };
}

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? 'GET').toUpperCase();
  const headers = buildHeaders(method, init);
  const response = await fetch(url, { ...init, method, headers });

  if (!response.ok) {
    const chatError = await parseError(response);
    const thrown = new Error(chatError.message) as Error & ChatError;
    thrown.code = chatError.code;
    throw thrown;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
