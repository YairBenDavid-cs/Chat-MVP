import type { User } from '@/messenger/chat/types/userTypes';
import type { AuthToken } from '@/login/types/authTypes';

const STORAGE_KEY = 'chat-mvp-auth';

type PersistedAuth = {
  user: User;
  token: AuthToken;
};

function readFromStorage(): PersistedAuth | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return null;
    }
    const parsed = JSON.parse(raw) as PersistedAuth;
    if (parsed === null || typeof parsed !== 'object') {
      return null;
    }
    if (typeof parsed.token !== 'string' || parsed.user === undefined) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeToStorage(session: PersistedAuth): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore quota / privacy-mode errors — in-memory cache still works
  }
}

function removeFromStorage(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

const initial = readFromStorage();
let authToken: AuthToken | null = initial?.token ?? null;
let authUser: User | null = initial?.user ?? null;

export function setAuthSession(user: User, token: AuthToken): void {
  authUser = user;
  authToken = token;
  writeToStorage({ user, token });
}

export function clearAuthSession(): void {
  authUser = null;
  authToken = null;
  removeFromStorage();
}

export function getAuthToken(): AuthToken | null {
  return authToken;
}

export function getAuthUser(): User | null {
  return authUser;
}
