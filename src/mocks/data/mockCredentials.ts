// Mock-only credentials (MSW). Demo: Alice / password123 (case-insensitive username).
const MOCK_PASSWORDS: Record<string, string> = {
  alice: 'password123',
  bob: 'password123',
  carol: 'password123',
};

function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function verifyPassword(username: string, password: string): boolean {
  const key = normalizeUsername(username);
  const expected = MOCK_PASSWORDS[key];
  return expected !== undefined && expected === password;
}
