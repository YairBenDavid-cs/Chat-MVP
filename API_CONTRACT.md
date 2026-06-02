# API Contract

This document is the source of truth for the chat API. Week 2 implements it as an
[MSW](https://mswjs.io/) mock; Week 3 implements the same contract server-side. Any
change to a shape here must be reflected in both the mock and this document.

The Week 2 mock lives in `src/mocks/` (handlers in `src/mocks/handlers/`). The client
calls every endpoint through a single typed module, `src/shared/api/apiClient.ts`
(`apiFetch<T>`).

## Conventions

- **Base URL:** relative (`/auth/login`, `/conversations`, …). The mock intercepts
  same-origin requests; Week 3 will serve these paths (optionally under an `/api` prefix —
  document the change if so).
- **Content type:** requests and responses are `application/json`. The client sets
  `Content-Type: application/json` on bodied methods and always sends `Accept: application/json`.
- **Authentication:** every endpoint except `POST /auth/login` requires
  `Authorization: Bearer <token>`. The token is the opaque string returned by login.
  Missing/invalid tokens return `401 UNAUTHORIZED`.
- **Timestamps:** ISO 8601 strings (e.g. `2026-05-28T10:00:00Z`).
- **IDs:** opaque strings. The client models them as branded string types
  (`UserId`, `ConversationId`, `MessageId`) — on the wire they are plain strings.

## Error shape

All non-2xx responses share one JSON body (`src/mocks/handlers/httpErrors.ts`):

```json
{ "code": "string", "message": "string" }
```

The client (`apiClient.ts`) throws an `Error` whose `message` is `message` and whose
`code` is `code`. If a non-2xx response has no parseable body, the client synthesizes
`{ code: "HTTP_<status>", message: <statusText> }`.

| Status | `code`         | When                                              |
| ------ | -------------- | ------------------------------------------------- |
| 400    | `BAD_REQUEST`  | Missing/invalid request fields                    |
| 401    | `UNAUTHORIZED` | Missing/invalid bearer token, or wrong password   |
| 403    | `FORBIDDEN`    | Authenticated but not a participant of the resource |
| 404    | `NOT_FOUND`    | User or conversation does not exist               |
| 500    | `SEND_FAILED`  | Simulated send failure (see `POST …/messages`)    |

## Core models

```ts
type User = {
  id: string;        // UserId
  username: string;
  avatarUrl: string;
};

type Conversation = {
  id: string;                 // ConversationId
  participants: string[];     // UserId[]
  title: string;
  avatarUrl: string;
  lastMessagePreview: string;
  lastMessageAt: string;      // ISO 8601
  unreadCount: number;
};

type Message = {
  id: string;             // MessageId
  conversationId: string; // ConversationId
  senderId: string;       // UserId
  text: string;
  createdAt: string;      // ISO 8601
  // `isOptimistic` is a client-only flag, never sent by the server.
};
```

---

## Endpoints

### `POST /auth/login`

Authenticate and obtain a token. No auth header required.

**Request**

```json
{ "username": "Alice", "password": "password123" }
```

**Response `200`**

```json
{
  "token": "<opaque-token>",
  "user": { "id": "u-alice", "username": "Alice", "avatarUrl": "https://i.pravatar.cc/100?u=alice" }
}
```

**Errors**

- `400 BAD_REQUEST` — `username` or `password` missing/empty.
- `404 NOT_FOUND` — no user with that username.
- `401 UNAUTHORIZED` — wrong password.

> **Mock note:** seeded users are `Alice`, `Bob`, `Carol` (username case-insensitive),
> all with password `password123`. Demo hint shown in the UI: `Alice / password123`.

---

### `GET /conversations`

List the authenticated user's conversations, **sorted by `lastMessageAt` descending**
(most recent first). Only conversations the user participates in are returned.

**Request** — no body. Requires `Authorization`.

**Response `200`**

```json
[
  {
    "id": "c-alice-bob",
    "participants": ["u-alice", "u-bob"],
    "title": "Bob",
    "avatarUrl": "https://i.pravatar.cc/100?u=bob",
    "lastMessagePreview": "See you tomorrow!",
    "lastMessageAt": "2026-05-28T10:30:00Z",
    "unreadCount": 0
  }
]
```

Returns `[]` when the user has no conversations.

**Errors** — `401 UNAUTHORIZED`.

---

### `GET /conversations/:id/messages?cursor=<cursor>`

Fetch one page of messages for a conversation, oldest→newest. Cursor-based pagination.

**Query params**

- `cursor` *(optional)* — opaque pagination cursor returned as `nextCursor` by a previous
  call. Omit to fetch the first page.

**Response `200`**

```json
{
  "messages": [
    {
      "id": "m-001",
      "conversationId": "c-alice-bob",
      "senderId": "u-alice",
      "text": "Hey Bob!",
      "createdAt": "2026-05-28T10:00:00Z"
    }
  ],
  "nextCursor": "MjA="
}
```

- `messages` — up to `PAGE_SIZE` items (mock: **20**).
- `nextCursor` — opaque string to pass as `?cursor=` for the next page, or `null` when there
  are no more messages. Clients must treat the cursor as opaque (the mock happens to encode a
  base64 offset, but that is an implementation detail and may change).

**Errors**

- `401 UNAUTHORIZED` — missing/invalid token.
- `404 NOT_FOUND` — conversation does not exist.
- `403 FORBIDDEN` — authenticated user is not a participant.

---

### `POST /conversations/:id/messages`

Create a message in a conversation. Backs the client's optimistic send.

**Request**

```json
{ "text": "Hello there" }
```

- `text` — required, non-empty, max **4000** characters.

**Response `200`** — the created message (the server assigns `id` and `createdAt`):

```json
{
  "id": "msg-1717000000000-123",
  "conversationId": "c-alice-bob",
  "senderId": "u-alice",
  "text": "Hello there",
  "createdAt": "2026-05-30T12:00:00Z"
}
```

**Errors**

- `400 BAD_REQUEST` — `text` missing/empty or longer than 4000 chars.
- `401 UNAUTHORIZED` — missing/invalid token.
- `404 NOT_FOUND` — conversation does not exist.
- `403 FORBIDDEN` — authenticated user is not a participant.
- `500 SEND_FAILED` — **simulated failure.** The mock fails ~20% of sends
  (`SEND_FAILURE_RATE = 0.2`) so the client's optimistic-rollback + error-toast path is
  exercised. This is mock-only behavior and will not exist in the Week 3 backend.
