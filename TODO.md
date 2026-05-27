# Chat MVP — Build TODO

## Ground Rules (read before you start)

1. **One step at a time.** Complete each step fully before moving to the next.
2. **Check TypeScript after every phase:** `npx tsc --noEmit` — fix errors before continuing.
3. **No nested JSX.** Every JSX file must return only `<Component />` references — no raw `<div>` inside `<div>`. If you have nesting, extract a component.
   ```tsx
   // ❌ nested JSX — not allowed
   return (
     <div className="panel">
       <div className="header">
         <h1>Title</h1>
       </div>
     </div>
   );

   // ✅ flat JSX — this is the rule
   return (
     <Panel>
       <PanelHeader />
     </Panel>
   );
   ```
4. **No `any`.** All types must be explicit.
5. **Check the browser** (`npm run dev`) after every component phase.

---

## Progress Tracker

- [ ] Phase 0 — Setup & Contract
- [ ] Phase 1 — Type Definitions
- [ ] Phase 2 — Mock Infrastructure
- [ ] Phase 3 — API Client
- [ ] Phase 4 — State Management
- [ ] Phase 5 — Custom Hooks
- [ ] Phase 6 — Feedback Components
- [ ] Phase 7 — Skeleton & Empty States
- [ ] Phase 8 — Auth Component
- [ ] Phase 9 — Message Components
- [ ] Phase 10 — Conversation Components
- [ ] Phase 11 — Layout Components
- [ ] Phase 12 — Wire App Together
- [ ] Phase 13 — Styling
- [ ] Phase 14 — Testing
- [ ] Phase 15 — Final Checks

---

## Phase 0 — Setup & Contract

> **Why start here?** Every other file in the project derives from the API contract. Types
> match it. Mocks implement it. The Week 3 backend will implement it too. Design it once,
> reference it everywhere.

### Step 1 · `API_CONTRACT.md` (project root)

**File:** `/API_CONTRACT.md`

**What:** Document every API endpoint with request and response shapes before writing any code.

**Write:**
- `POST /auth/login` — request: `{ userId }`, response: `{ token, user }`
- `GET /conversations` — response: `Conversation[]` sorted by last message
- `GET /conversations/:id/messages?cursor=...` — response: `{ messages, nextCursor }`
- `POST /conversations/:id/messages` — request: `{ text }`, response: `Message`
- Error shape for every endpoint: `{ code: string, message: string }`
- All field names and TypeScript-style type annotations

**Checkpoint:** Can you clearly describe what data goes in and what comes out for every endpoint? That's when this step is done.

---

## Phase 1 — Type Definitions

> **Why types first?** TypeScript will enforce these shapes across every other file. Define
> the data, then write the logic. Types have zero dependencies — they're the foundation
> everything else imports from.

### Step 2 · `src/chat/types/authTypes.ts`

**What:** TypeScript types for everything auth-related.

**Write:**
```ts
// What a logged-in user looks like
type AuthUser = { id: string; username: string; avatarUrl: string };

// The session token
type AuthToken = string;

// What the login API receives
type LoginRequest = { userId: string };

// What the login API returns
type LoginResponse = { token: AuthToken; user: AuthUser };
```

**Why now:** Before any auth logic exists, we nail down the data shapes. Every auth hook, component, and mock will import from here.

---

### Step 3 · `src/chat/types/conversationTypes.ts`

**What:** TypeScript types for conversations.

**Write:**
- `ConversationId` — a branded string: `type ConversationId = string & { readonly __brand: 'ConversationId' }`
- `Conversation` — `{ id, participants, lastMessagePreview, lastMessageAt, unreadCount }`
- `ConversationSummary` — the minimal shape the list displays (name, preview text, timestamp)

**Why now:** Before writing any conversation state or components, we define what a "conversation" is. The whole sidebar depends on this.

---

### Step 4 · `src/chat/types/messageTypes.ts`

**What:** TypeScript types for messages and pagination.

**Write:**
- `MessageId` — branded string type
- `Message`:
  ```ts
  type Message = {
    id: MessageId;
    conversationId: ConversationId;
    senderId: string;
    text: string;
    createdAt: string; // ISO 8601
    isOptimistic?: boolean; // true while send is in-flight
  };
  ```
- `PaginationCursor` — `string | null` (null means no more pages)
- `MessagesPage` — `{ messages: Message[]; nextCursor: PaginationCursor }`

**Why now:** The `isOptimistic` flag is critical — it lets the UI show "sending..." state on messages that haven't been confirmed by the server yet.

---

### Step 5 · `src/chat/types/chatStateTypes.ts`

**What:** The shape of the entire application's state in one place.

**Write:**
- `ChatStatus` — `'idle' | 'loading' | 'success' | 'error'`
- `ChatError` — `{ code: string; message: string }`
- `ChatState`:
  ```ts
  type ChatState = {
    user: AuthUser | null;
    token: AuthToken | null;
    conversations: Conversation[];
    selectedConversationId: ConversationId | null;
    messages: Message[];
    conversationsStatus: ChatStatus;
    messagesStatus: ChatStatus;
    authStatus: ChatStatus;
    sendStatus: ChatStatus;
    conversationsError: ChatError | null;
    messagesError: ChatError | null;
    authError: ChatError | null;
    sendError: ChatError | null;
  };
  ```

**Why now:** This is the "map" of the app. Once you see all the states, you know exactly what every component needs to handle. The reducer in Phase 4 will change this state. Hooks in Phase 5 will read it.

**TypeScript check:** `npx tsc --noEmit` — should pass with zero errors.

---

## Phase 2 — Mock Infrastructure

> **Why before the API client?** The mock handlers *are* the backend. They must exist before
> any `fetch` call can succeed. MSW intercepts network requests at the service worker level —
> set it up before any logic, so you can test every API call in the browser from day one.

### Step 6 · MSW Bootstrap (3 files together — same purpose)

**Files:**
- `src/mocks/browser.ts`
- `src/mocks/server.ts`
- `src/mocks/index.ts`

**What:** Wire up MSW for browser (dev) and Node (tests).

**Write `browser.ts`:**
```ts
import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/authHandlers';
import { conversationsHandlers } from './handlers/conversationsHandlers';
import { messagesHandlers } from './handlers/messagesHandlers';

export const worker = setupWorker(
  ...authHandlers,
  ...conversationsHandlers,
  ...messagesHandlers,
);
```

**Write `server.ts`:**
```ts
import { setupServer } from 'msw/node';
import { authHandlers } from './handlers/authHandlers';
import { conversationsHandlers } from './handlers/conversationsHandlers';
import { messagesHandlers } from './handlers/messagesHandlers';

export const server = setupServer(
  ...authHandlers,
  ...conversationsHandlers,
  ...messagesHandlers,
);
```

**Write `index.ts`:**
```ts
export async function startMockWorker(): Promise<void> {
  const { worker } = await import('./browser');
  await worker.start({ onUnhandledRequest: 'warn' });
}
```

**Why now:** Everything after this uses `fetch`. This file makes `fetch` work against fake data.

---

### Step 7 · `src/mocks/handlers/authHandlers.ts`

**What:** MSW handler for `POST /auth/login`.

**Write:**
- Import `http` and `HttpResponse` from `msw`
- Define 3 mock users as a constant (`MOCK_USERS`)
- Handle `POST /auth/login`: read `userId` from request body, find the user, return `{ token: 'mock-token-{userId}', user }`
- Return 404 if userId not found

**Why now:** Without this, the login button will throw a network error. With it, you can log in immediately once the Auth component exists.

---

### Step 8 · `src/mocks/handlers/conversationsHandlers.ts`

**What:** MSW handler for `GET /conversations`.

**Write:**
- Define 4–5 hardcoded conversations as a constant (`MOCK_CONVERSATIONS`)
- Each conversation should have realistic data: two participants, a last message preview, a timestamp
- Handle `GET /conversations`: return all conversations sorted by `lastMessageAt` descending
- (Optional) Filter by the user from the Authorization header

**Why now:** The sidebar needs data. These conversations will appear the moment the ConversationList component renders.

---

### Step 9 · `src/mocks/handlers/messagesHandlers.ts`

**What:** MSW handlers for `GET /conversations/:id/messages` and `POST /conversations/:id/messages`.

**Write:**
- In-memory message store: `const messageStore = new Map<string, Message[]>()`
- Seed it with 10–15 messages spread across conversations
- `GET /conversations/:id/messages?cursor=...`:
  - Support cursor-based pagination (cursor = index offset as base64 string)
  - Return `{ messages: Message[], nextCursor: string | null }`
- `POST /conversations/:id/messages`:
  - Add message to in-memory store
  - **Simulate failure:** 20% of the time return HTTP 500 `{ code: 'SEND_FAILED', message: 'Simulated failure' }`
  - On success, return the created `Message` with a server-generated id

**Why now:** The simulated failure is how you'll test optimistic rollback. Without it, you'd never see the rollback behavior.

**TypeScript check:** `npx tsc --noEmit`

---

### Step 10 · Update `src/main.tsx` — Start MSW

**What:** Call `startMockWorker()` before rendering the React tree.

**Write:**
```tsx
import { startMockWorker } from './mocks';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

startMockWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
```

**Why now:** MSW registers a Service Worker. If React renders before the worker is registered, early `fetch` calls will hit the real network (and fail). The `.then()` ensures the worker is active first.

**Browser check:** Run `npm run dev`. Open DevTools → Network tab. You should see `[MSW] Mocking enabled` in the console.

---

## Phase 3 — API Client

> **Why a typed API layer?** Components and hooks should never call `fetch` directly. The
> API client is a single, typed, testable boundary between "React world" and "network world".
> If the URL or response shape changes, you fix it in one file, not scattered across components.

### Step 11 · `src/chat/api/apiClient.ts`

**What:** A base `apiFetch<T>` wrapper used by every API function.

**Write:**
- Store the auth token in a module-level variable: `let authToken: string | null = null`
- Export `setAuthToken(token: string): void` — called after login
- Export `apiFetch<T>(url: string, options?: RequestInit): Promise<T>`:
  - Adds `Authorization: Bearer {token}` header if token exists
  - Adds `Content-Type: application/json` for POST/PUT
  - Awaits response, checks `response.ok`
  - On error: parses error body as `ChatError`, throws it
  - On success: parses and returns `T`

**Why now:** Every API function (Steps 12–14) imports this. Write it once, use it everywhere.

---

### Step 12 · `src/chat/api/authApi.ts`

**What:** The `login()` function that calls `POST /auth/login`.

**Write:**
```ts
export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  setAuthToken(response.token); // store token for future requests
  return response;
}
```

**Why now:** The auth hook (Phase 5) imports this. Simple, typed, testable.

---

### Step 13 · `src/chat/api/conversationsApi.ts`

**What:** `getConversations()` function.

**Write:**
```ts
export async function getConversations(): Promise<Conversation[]> {
  return apiFetch<Conversation[]>('/conversations');
}
```

**Why now:** Simple GET, no params. The conversations hook will call this after login.

---

### Step 14 · `src/chat/api/messagesApi.ts`

**What:** `getMessages()` and `sendMessage()` functions.

**Write:**
```ts
export async function getMessages(
  conversationId: ConversationId,
  cursor?: PaginationCursor,
): Promise<MessagesPage> {
  const params = cursor ? `?cursor=${cursor}` : '';
  return apiFetch<MessagesPage>(`/conversations/${conversationId}/messages${params}`);
}

export async function sendMessage(
  conversationId: ConversationId,
  text: string,
): Promise<Message> {
  return apiFetch<Message>(`/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}
```

**Why now:** The messages hook (Phase 5) imports both of these. The `sendMessage` function is what can fail (randomly, thanks to the mock from Step 9), triggering the rollback flow.

**TypeScript check:** `npx tsc --noEmit`

---

## Phase 4 — State Management

> **Why a reducer pattern?** The chat app has many interconnected states: loading, sending,
> error, optimistic messages, selected conversation. A reducer puts ALL state transitions in
> one file, making the app's behavior easy to read, trace, and debug. Every state change is
> an explicit, named action — nothing happens "magically".

### Step 15 · `src/chat/state/chatActionTypes.ts`

**What:** Every possible action type as a union of string literals.

**Write:**
```ts
// Auth
export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';

// Conversations
export const CONVERSATIONS_FETCH_START = 'CONVERSATIONS_FETCH_START';
export const CONVERSATIONS_FETCH_SUCCESS = 'CONVERSATIONS_FETCH_SUCCESS';
export const CONVERSATIONS_FETCH_FAILURE = 'CONVERSATIONS_FETCH_FAILURE';
export const CONVERSATION_SELECT = 'CONVERSATION_SELECT';

// Messages
export const MESSAGES_FETCH_START = 'MESSAGES_FETCH_START';
export const MESSAGES_FETCH_SUCCESS = 'MESSAGES_FETCH_SUCCESS';
export const MESSAGES_FETCH_FAILURE = 'MESSAGES_FETCH_FAILURE';

// Optimistic send
export const MESSAGE_SEND_OPTIMISTIC = 'MESSAGE_SEND_OPTIMISTIC';
export const MESSAGE_SEND_SUCCESS = 'MESSAGE_SEND_SUCCESS';
export const MESSAGE_SEND_FAILURE = 'MESSAGE_SEND_FAILURE'; // rollback
export const SEND_ERROR_DISMISS = 'SEND_ERROR_DISMISS';
```

**Why now:** This is a complete map of everything the app can do. If an action isn't listed here, it doesn't exist.

---

### Step 16 · `src/chat/state/chatActions.ts`

**What:** Typed action creator functions — one per action type.

**Write:** One function per action. Example pattern:
```ts
// Instead of writing { type: 'AUTH_LOGIN_SUCCESS', payload: user } everywhere,
// you call loginSuccess(user) — typed, autocompleted, refactorable.

export function loginSuccess(user: AuthUser, token: AuthToken) {
  return { type: AUTH_LOGIN_SUCCESS, payload: { user, token } } as const;
}

export function messageOptimistic(tempId: MessageId, text: string, senderId: string) {
  return { type: MESSAGE_SEND_OPTIMISTIC, payload: { tempId, text, senderId } } as const;
}

export function messageSendFailure(tempId: MessageId, error: ChatError) {
  return { type: MESSAGE_SEND_FAILURE, payload: { tempId, error } } as const;
}
// ... one for every action type in Step 15
```

**Why now:** The reducer (Step 18) and hooks (Phase 5) import these. The `as const` pattern ensures TypeScript narrows the type to the exact action, not just `string`.

---

### Step 17 · `src/chat/state/chatInitialState.ts`

**What:** The state of the app before anything has happened.

**Write:**
```ts
export const initialChatState: ChatState = {
  user: null,
  token: null,
  conversations: [],
  selectedConversationId: null,
  messages: [],
  conversationsStatus: 'idle',
  messagesStatus: 'idle',
  authStatus: 'idle',
  sendStatus: 'idle',
  conversationsError: null,
  messagesError: null,
  authError: null,
  sendError: null,
};
```

**Why now:** The reducer needs a starting point. Simple, but important to isolate here — if you need to reset state, you just return `initialChatState`.

---

### Step 18 · `src/chat/state/chatReducer.ts`

**What:** The pure reducer function — the heart of the app.

**Write:**
```ts
export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return { ...state, authStatus: 'loading', authError: null };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        authStatus: 'success',
        user: action.payload.user,
        token: action.payload.token,
      };

    case MESSAGE_SEND_OPTIMISTIC: {
      // Add message immediately — appears in UI right away
      const optimisticMessage: Message = {
        id: action.payload.tempId,
        text: action.payload.text,
        senderId: action.payload.senderId,
        conversationId: state.selectedConversationId!,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };
      return { ...state, messages: [...state.messages, optimisticMessage], sendStatus: 'loading' };
    }

    case MESSAGE_SEND_SUCCESS: {
      // Replace the optimistic message with the real one from the server
      const updated = state.messages.map((m) =>
        m.id === action.payload.tempId ? { ...action.payload.message, isOptimistic: false } : m,
      );
      return { ...state, messages: updated, sendStatus: 'success', sendError: null };
    }

    case MESSAGE_SEND_FAILURE: {
      // ROLLBACK: remove the optimistic message, store the error
      const rolledBack = state.messages.filter((m) => m.id !== action.payload.tempId);
      return { ...state, messages: rolledBack, sendStatus: 'error', sendError: action.payload.error };
    }

    // ... handle all other action types
  }
}
```

**Why now:** This is the most important file in the project. Every state change goes through here. The optimistic send + rollback is the key feature of the assignment — understand this function deeply.

---

### Step 19 · `src/chat/state/chatContext.ts`

**What:** React Context that wraps the reducer and makes state available everywhere.

**Write:**
- Create `ChatContext` with `{ state: ChatState; dispatch: React.Dispatch<ChatAction> }`
- Create `ChatProvider` component:
  ```tsx
  export function ChatProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [state, dispatch] = useReducer(chatReducer, initialChatState);
    return (
      <ChatContext.Provider value={{ state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  }
  ```
- Create `useChatContext()` hook:
  ```ts
  export function useChatContext(): { state: ChatState; dispatch: React.Dispatch<ChatAction> } {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChatContext must be used inside ChatProvider');
    return ctx;
  }
  ```

**Why now:** This makes the state accessible to every component without prop-drilling. All hooks in Phase 5 will import `useChatContext()`.

**TypeScript check:** `npx tsc --noEmit`

---

## Phase 5 — Custom Hooks

> **Why a hooks layer?** Components should be dumb — they display data and call handlers.
> Hooks are where the "smart" logic lives: calling APIs, dispatching actions, managing
> side effects. This separation makes components easy to read and hooks easy to test.

### Step 20 · `src/chat/hooks/useAuth.ts`

**What:** Hook exposing auth state and the login action.

**Write:**
```ts
export function useAuth(): {
  user: AuthUser | null;
  isLoading: boolean;
  error: ChatError | null;
  login: (userId: string) => Promise<void>;
} {
  const { state, dispatch } = useChatContext();

  async function login(userId: string): Promise<void> {
    dispatch(loginStart());
    try {
      const response = await authApi.login({ userId });
      dispatch(loginSuccess(response.user, response.token));
    } catch (err) {
      dispatch(loginFailure(err as ChatError));
    }
  }

  return {
    user: state.user,
    isLoading: state.authStatus === 'loading',
    error: state.authError,
    login,
  };
}
```

**Why now:** The AuthScreen (Phase 8) needs this hook. Notice how AuthScreen never sees `dispatch` or `apiFetch` — it just calls `login(userId)`.

---

### Step 21 · `src/chat/hooks/useScrollToBottom.ts`

**What:** Utility hook — scrolls a container to the bottom whenever its content changes.

**Write:**
```ts
export function useScrollToBottom<T extends HTMLElement>(
  deps: unknown[],
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
```

**Why now:** This is a pure utility with no app-specific knowledge. MessageList (Step 34) will attach this ref to the scroll container. Building it now proves the hook extraction pattern works for non-state logic too.

---

### Step 22 · `src/chat/hooks/useConversations.ts`

**What:** Thin wrapper exposing conversations state and the select action.

**Write:**
```ts
export function useConversations(): {
  conversations: Conversation[];
  status: ChatStatus;
  error: ChatError | null;
  selectedId: ConversationId | null;
  selectConversation: (id: ConversationId) => void;
} {
  const { state, dispatch } = useChatContext();

  function selectConversation(id: ConversationId): void {
    dispatch(conversationSelect(id));
  }

  return {
    conversations: state.conversations,
    status: state.conversationsStatus,
    error: state.conversationsError,
    selectedId: state.selectedConversationId,
    selectConversation,
  };
}
```

**Why now:** ConversationList (Step 38) imports this. It knows nothing about dispatch or context — it just calls `selectConversation(id)`.

---

### Step 23 · `src/chat/hooks/useMessages.ts`

**What:** Hook exposing messages for the selected conversation, with optimistic send.

**Write:**
```ts
export function useMessages(): {
  messages: Message[];
  status: ChatStatus;
  sendError: ChatError | null;
  sendMessage: (text: string) => Promise<void>;
  dismissSendError: () => void;
} {
  const { state, dispatch } = useChatContext();

  async function sendMessage(text: string): Promise<void> {
    const tempId = `optimistic-${Date.now()}` as MessageId;
    dispatch(messageOptimistic(tempId, text, state.user!.id));

    try {
      const message = await messagesApi.sendMessage(state.selectedConversationId!, text);
      dispatch(messageSendSuccess(tempId, message));
    } catch (err) {
      dispatch(messageSendFailure(tempId, err as ChatError));
      // message disappears from UI — rollback complete
    }
  }

  function dismissSendError(): void {
    dispatch(sendErrorDismiss());
  }

  return {
    messages: state.messages,
    status: state.messagesStatus,
    sendError: state.sendError,
    sendMessage,
    dismissSendError,
  };
}
```

**Why now:** This is the most complex hook. The optimistic flow is: dispatch → UI updates → API call → success (swap) OR failure (rollback). Read the reducer (Step 18) alongside this to see both sides.

---

### Step 24 · `src/chat/hooks/useChat.ts`

**What:** Main orchestrator hook — loads data on mount, re-fetches when selection changes.

**Write:**
```ts
export function useChat(): void {
  const { state, dispatch } = useChatContext();

  // Load conversations after login
  useEffect(() => {
    if (!state.user) return;
    dispatch(conversationsFetchStart());
    getConversations()
      .then((convs) => dispatch(conversationsFetchSuccess(convs)))
      .catch((err) => dispatch(conversationsFetchFailure(err)));
  }, [state.user]);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (!state.selectedConversationId) return;
    dispatch(messagesFetchStart());
    getMessages(state.selectedConversationId)
      .then((page) => dispatch(messagesFetchSuccess(page.messages)))
      .catch((err) => dispatch(messagesFetchFailure(err)));
  }, [state.selectedConversationId]);
}
```

**Why now:** `ChatPage` (Step 42) calls this hook once. All data loading happens here. Components just read from context — they never trigger fetches directly.

**TypeScript check:** `npx tsc --noEmit`

---

## Phase 6 — Feedback Components

> **Why build these first among components?** They have zero dependencies on hooks or state.
> They're pure display. Building them forces you to practice the `<Something />` JSX rule
> in its simplest form before tackling complex components.

### Step 25 · `src/chat/components/feedback/LoadingState.tsx`

**What:** Generic loading indicator.

**Write:**
- Props: `{ label?: string }`
- Render a spinner or animated dots with the optional label
- **No nested JSX:** if you need a wrapper and a spinner, make `<Spinner />` and `<LoadingLabel />` separate components in this file

---

### Step 26 · `src/chat/components/feedback/ErrorState.tsx`

**What:** Generic error block shown when a fetch fails.

**Write:**
- Props: `{ message: string; onRetry?: () => void }`
- Render the message in a styled error container
- If `onRetry` is provided, render a retry button
- **No nested JSX:** extract `<ErrorMessage />` and `<RetryButton />` if needed

---

### Step 27 · `src/chat/components/feedback/ErrorToast.tsx`

**What:** A dismissible toast for failed message sends.

**Write:**
- Props: `{ message: string; onDismiss: () => void }`
- Fixed/absolute positioned at the bottom of the panel
- Auto-dismiss after 3 seconds using `useEffect` + `setTimeout`
- Also has an `×` close button
- **No nested JSX:** extract `<ToastMessage />` and `<DismissButton />` if needed

**Browser check:** `npm run dev` — you won't see these yet, but `npx tsc --noEmit` should pass.

---

## Phase 7 — Skeleton & Empty State Components

> **Why think about empty/loading states before building "real" UI?** Every list in the app
> has 4 possible states: loading, empty, error, success. If you build the success state only,
> you'll forget the others. Build the others first — it forces you to plan for them.

### Step 28 · `src/chat/components/conversations/ConversationSkeleton.tsx`

**What:** Pulsing placeholder row shown while conversations are loading.

**Write:**
- No props
- Mimics the shape of a `ConversationListItem` with grey animated bars
- Use CSS `@keyframes` for the pulse animation (defined in `index.css` in Phase 13)
- **No nested JSX:** extract `<SkeletonAvatar />` and `<SkeletonTextLines />` as sub-components

---

### Step 29 · `src/chat/components/messages/MessageSkeleton.tsx`

**What:** Pulsing placeholder bubble shown while messages are loading.

**Write:**
- No props
- Renders 4–5 alternating left/right bubbles of varying widths
- Same pulse animation as ConversationSkeleton
- **No nested JSX:** extract `<SkeletonBubble />` as a sub-component

---

### Step 30 · `src/chat/components/conversations/ConversationEmptyState.tsx`

**What:** The UI shown when the logged-in user has no conversations.

**Write:**
- No props
- Shows a friendly message: "No conversations yet" + optional illustration or emoji

---

### Step 31 · `src/chat/components/messages/MessageEmptyState.tsx`

**What:** Two different empty states for the message panel.

**Write:**
- Props: `{ hasSelection: boolean }`
- `hasSelection: false` → "Select a conversation to start chatting"
- `hasSelection: true` → "No messages yet — say hello!"

**TypeScript check:** `npx tsc --noEmit`

---

## Phase 8 — Auth Component

> **Why the auth component now?** It's the first component that calls a hook and triggers a
> real (mocked) API call. It's also simple enough to understand clearly — just a list of
> buttons. Building it proves the whole stack from component → hook → reducer → API → mock works.

### Step 32 · `src/chat/components/auth/AuthScreen.tsx`

**What:** The "log in as user X" screen.

**Write:**
- No props — uses `useAuth()` internally
- Import the 3 mock users from a constants file (or inline them temporarily)
- Render one `<UserSelectButton />` per user
- Show `<LoadingState />` during login (use `isLoading` from `useAuth()`)
- Show `<ErrorState />` if login fails
- **No nested JSX:**
  - Extract `<UserSelectButton />` as a sub-component (or its own file)
  - The return of `AuthScreen` should be `<AuthScreenContainer>` with `<UserList />` inside — all `<X />` references

**Why now:** With this done, you can actually interact with the running app. Log in, see the loading state, and watch the auth state change in React DevTools. The full Phase 0–8 stack is now exercised.

**Browser check:** `npm run dev` → you should see a screen with 3 user buttons. Click one → loading state → (for now) the UI won't change further, but check the console for successful API calls.

---

## Phase 9 — Message Components (Bottom-Up)

> **Why bottom-up?** Start with the most atomic component (MessageItem — no children, no hooks)
> and compose upward. Each step only imports from files already built. You always have
> something that compiles and renders.

### Step 33 · `src/chat/components/messages/MessageItem.tsx`

**What:** A single message bubble — no logic, pure display.

**Write:**
- Props: `{ message: Message; currentUserId: string }`
- Determine if the message is "mine" (`message.senderId === currentUserId`)
- "Mine" → right-aligned, different color
- Others' → left-aligned
- `isOptimistic: true` → reduced opacity (message is "sending")
- **No nested JSX:** extract as separate components:
  - `<MessageBubble>` — the coloured bubble wrapper
  - `<MessageText>` — the text content
  - `<MessageTimestamp>` — formatted time
  - `MessageItem` itself returns only `<MessageBubble>` and `<MessageTimestamp>`

---

### Step 34 · `src/chat/components/messages/MessageList.tsx`

**What:** Scrollable list of messages with auto-scroll.

**Write:**
- Props: `{ messages: Message[]; currentUserId: string }`
- Attach `useScrollToBottom` ref to the scroll container
- Map messages to `<MessageItem />` components
- **No nested JSX:** the scroll container wraps only `<MessageItem />` refs — no inline JSX

---

### Step 35 · `src/chat/components/messages/MessageInput.tsx`

**What:** The message composer — a controlled textarea with keyboard shortcuts.

**Write:**
- Props: `{ onSend: (text: string) => void; disabled?: boolean }`
- Controlled state: `const [text, setText] = useState('')`
- `onKeyDown` handler:
  - `Enter` (no Shift) → call `onSend(text)` + clear input
  - `Shift+Enter` → let the default newline happen
- **No nested JSX:** extract:
  - `<ComposerTextarea>` — the `<textarea>` element
  - `<SendButton>` — the submit button
  - `MessageInput` returns `<ComposerForm>` with `<ComposerTextarea />` and `<SendButton />`

---

### Step 36 · `src/chat/components/messages/MessagePanel.tsx`

**What:** Composes the full right panel — list + input + toast.

**Write:**
- No props — uses `useMessages()` internally
- Also uses `useAuth()` to get `currentUserId`
- Logic:
  - `status === 'loading'` → `<MessageSkeleton />`
  - `status === 'error'` → `<ErrorState />`
  - `messages.length === 0` → `<MessageEmptyState hasSelection />`
  - otherwise → `<MessageList />`
- Always renders `<MessageInput />` at the bottom
- If `sendError` is set → renders `<ErrorToast />` with `dismissSendError` as `onDismiss`
- **No nested JSX:** every branch is a named component — no inline wrappers

**Why now:** This is the first true "container" component — it owns state from hooks and passes it down. The `MessagePanel` has zero logic duplication because everything lives in `useMessages()`.

**Browser check:** `npm run dev` — after this step, log in and select a conversation; you should see the message panel render (even if empty/loading).

---

## Phase 10 — Conversation Components (Bottom-Up)

### Step 37 · `src/chat/components/conversations/ConversationListItem.tsx`

**What:** A single conversation row — pure display.

**Write:**
- Props: `{ conversation: Conversation; isSelected: boolean; onSelect: () => void }`
- Shows the conversation name/participants, last message preview, and timestamp
- Highlighted styling when `isSelected`
- `onClick` → `onSelect()`
- **No nested JSX:** extract:
  - `<ConversationAvatar>` — initial letter or avatar
  - `<ConversationMeta>` — name + preview text
  - `<ConversationTimestamp>` — formatted date
  - `ConversationListItem` returns these three as flat `<X />` references

---

### Step 38 · `src/chat/components/conversations/ConversationList.tsx`

**What:** Full conversation list with all states handled.

**Write:**
- No props — uses `useConversations()` internally
- Logic:
  - `status === 'loading'` → render 3× `<ConversationSkeleton />`
  - `status === 'error'` → `<ErrorState />`
  - `conversations.length === 0` → `<ConversationEmptyState />`
  - otherwise → map conversations to `<ConversationListItem />`
- **No nested JSX:** the list container wraps only `<X />` references

**TypeScript check:** `npx tsc --noEmit`

---

## Phase 11 — Layout Components

> **Why layout last among components?** Layout components are the outermost shells.
> They need to know about the inner components they contain. Building them last means
> you're assembling known pieces, not imagining future ones.

### Step 39 · `src/chat/components/layout/SidebarLayout.tsx`

**What:** The left column's structural wrapper.

**Write:**
- Props: `{ children: React.ReactNode }`
- Renders an `<aside>` (semantically a sidebar) with sidebar CSS class
- No logic — pure structural component

---

### Step 40 · `src/chat/components/layout/MainPanelLayout.tsx`

**What:** The right column's structural wrapper.

**Write:**
- Props: `{ children: React.ReactNode }`
- Renders a `<main>` element with main panel CSS class
- No logic — pure structural component

---

### Step 41 · `src/chat/components/layout/ChatLayout.tsx`

**What:** The 2-column layout shell.

**Write:**
- Props: `{ sidebar: React.ReactNode; main: React.ReactNode }`
- Renders `<SidebarLayout>` and `<MainPanelLayout>` side by side inside a flex container
- No logic, no hooks
- **No nested JSX:**
  ```tsx
  return (
    <ChatLayoutContainer>
      <SidebarLayout>{sidebar}</SidebarLayout>
      <MainPanelLayout>{main}</MainPanelLayout>
    </ChatLayoutContainer>
  );
  ```

---

### Step 42 · `src/chat/components/layout/ChatPage.tsx`

**What:** The entry point of the chat feature — the auth gate.

**Write:**
- No props
- Calls `useAuth()` + `useChat()` (the orchestrator)
- Logic: if `!user` → show `<AuthScreen />`; otherwise → show `<ChatLayout />`
- **No nested JSX:**
  ```tsx
  if (!user) return <AuthScreen />;

  return (
    <ChatLayout
      sidebar={<ConversationList />}
      main={<MessagePanel />}
    />
  );
  ```

**Why now:** This is the composition moment — all the pieces come together in one file. Every component we built flows through this gate.

---

## Phase 12 — Wire App Together

### Step 43 · Update `src/App.tsx`

**What:** Replace the Vite boilerplate with the actual app.

**Write:**
```tsx
import { ChatProvider } from './chat/state/chatContext';
import { ChatPage } from './chat/components/layout/ChatPage';

export default function App(): JSX.Element {
  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}
```

**Why now:** This is the payoff. Every step since Phase 0 has been building toward this single `<ChatProvider><ChatPage /></ChatProvider>`. The entire app renders from here.

**Browser check:** `npm run dev` — the full app should be functional end to end:
1. See the login screen → click a user → log in
2. See the conversation list populate in the sidebar
3. Click a conversation → see messages load on the right
4. Type a message + Enter → see it appear immediately (optimistic)
5. ~20% of the time → see the message disappear (rollback) + see an error toast

---

## Phase 13 — Styling

### Step 44 · `src/index.css`

**What:** Global CSS for the entire app.

**Write:**
- CSS custom properties: `--color-primary`, `--color-bg`, `--color-surface`, `--color-text`, etc.
- Base reset: `*, box-sizing: border-box`, `body { margin: 0 }`
- `.chat-layout` — `display: flex; height: 100vh`
- `.sidebar` — `width: 320px; border-right: 1px solid var(--color-border); overflow-y: auto`
- `.main-panel` — `flex: 1; display: flex; flex-direction: column`
- `.message-bubble-mine` — right-aligned, primary color background
- `.message-bubble-other` — left-aligned, surface color
- `.message-bubble-optimistic` — 60% opacity
- `.skeleton` — grey background, `@keyframes skeleton-pulse { 0%, 100% { opacity: 0.4 } 50% { opacity: 1 } }`
- `.error-toast` — fixed position, bottom-right, error color

**Why now:** Styles come after structure — you can't style what doesn't exist. Now that every component renders, add the CSS that makes it look good.

---

## Phase 14 — Testing

> **Why tests at the end?** You understand the code well now. Tests written after implementation
> verify real behavior. Tests written before can slow you down when the API changes.
> (In a larger project you'd mix TDD and post-hoc tests — this order is optimized for learning.)

### Step 45 · Configure Vitest

**Files:** `vitest.config.ts` + `src/test-setup.ts`

**Install dependencies:**
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

**Write `vitest.config.ts`:**
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    globals: true,
  },
});
```

**Write `src/test-setup.ts`:**
```ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

**Why now:** The MSW `server` (from Step 6) makes API calls work in Node tests too. Every test gets a clean handler state thanks to `resetHandlers()`.

---

### Step 46 · `src/chat/__tests__/MessageInput.test.tsx`

**What:** Test the Enter vs Shift+Enter keyboard behavior.

**Tests:**
```tsx
// 1. Enter key submits the message and clears the input
// 2. Shift+Enter adds a newline, does NOT submit
// 3. Submit with empty text does nothing
// 4. disabled=true → Enter does not call onSend
```

**Why this test first:** `MessageInput` has no hooks, no context — it's a pure component with props. The simplest possible test. Gets you comfortable with `@testing-library/user-event`.

---

### Step 47 · `src/chat/__tests__/ConversationList.test.tsx`

**What:** Test all three render paths of the conversation list.

**Tests:**
```tsx
// 1. Shows skeleton items while status === 'loading'
// 2. Shows empty state when conversations === []
// 3. Shows conversation items when data is present
// 4. Clicking an item calls selectConversation with the correct ID
```

**Why:** Tests a component with 3 branches. Each branch maps to a state in the reducer — this proves the reducer → context → hook → component pipeline works.

---

### Step 48 · `src/chat/__tests__/ChatPage.test.tsx`

**What:** Integration test for the auth gate.

**Tests:**
```tsx
// 1. Renders AuthScreen when user is null
// 2. After clicking a user button, renders ChatLayout (not AuthScreen)
// 3. During login, shows loading state on the auth screen
```

**Why:** This is a higher-level integration test. It exercises the full stack: user event → hook → reducer → context → re-render.

---

### Step 49 · `src/chat/__tests__/useChat.test.ts`

**What:** Unit tests for optimistic send + rollback.

**Tests:**
```ts
// 1. After sendMessage(), the message appears in state with isOptimistic: true
// 2. After successful response, the optimistic message is replaced with the real one
// 3. After API failure, the optimistic message is removed (rollback)
// 4. After API failure, sendError is set in state
// 5. dismissSendError() clears sendError
```

**Why:** This is the most important test. The optimistic update + rollback is a complex state transition. A passing test proves the reducer logic in Step 18 is correct.

---

### Step 50 · `src/chat/__tests__/MessagePanel.test.tsx`

**What:** Integration test for the full message panel.

**Tests:**
```tsx
// 1. Shows skeleton when loading
// 2. Shows empty state when no messages
// 3. Message appears immediately after send (optimistic)
// 4. Toast appears when send fails
// 5. Dismissing the toast removes it
```

**TypeScript check:** `npx tsc --noEmit`

**Run all tests:**
```bash
npx vitest run
```
— Must pass: ≥ 5 tests. All must be green.

---

## Phase 15 — Final Checks

### Step 51 · TypeScript Strict Check

```bash
npx tsc --noEmit
```

Fix every error. Common issues:
- Unused variables (`_x` prefix to suppress, or delete)
- Missing return types on functions
- `null` not handled (use optional chaining `?.` or guards)
- Wrong prop types

---

### Step 52 · ESLint Check

```bash
npm run lint
```

Fix every warning and error. Common issues:
- Missing `useEffect` dependencies (add them or use `useCallback`)
- Unused imports
- `any` type usage

---

### Step 53 · Review `API_CONTRACT.md`

Do a final consistency audit:
- Every endpoint in `API_CONTRACT.md` has a matching handler in `src/mocks/handlers/`
- Every response type matches a type in `src/chat/types/`
- Cursor pagination is documented with an example request/response pair

---

### Step 54 · Write the PR Description

**Include:**
- One-paragraph summary of what you built
- Link to `API_CONTRACT.md`
- List of all states handled per component (loading / empty / success / error)
- List of all custom hooks and what they expose
- Key tradeoffs and decisions:
  - Why `useReducer` instead of `useState`?
  - Why MSW instead of hardcoded data in components?
  - How does optimistic update work?
  - What happens on rollback?

---

## Final Checklist (Assignment Acceptance Criteria)

- [ ] All UI states (loading, empty, success, error) are visibly handled
- [ ] Optimistic send works and rolls back on simulated failure
- [ ] Auto-scroll keeps the latest message in view
- [ ] Cursor-style pagination supported in the API mock
- [ ] At least one custom hook (`useMessages`, `useChat`, etc.)
- [ ] At least one `useReducer` usage (`chatContext.ts`)
- [ ] At least 5 passing unit/component tests
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `API_CONTRACT.md` documents every endpoint with request/response shapes
- [ ] PR submitted with full description

---

## Quick Reference: File → Step Map

| File | Step |
|------|------|
| `API_CONTRACT.md` | 1 |
| `chat/types/authTypes.ts` | 2 |
| `chat/types/conversationTypes.ts` | 3 |
| `chat/types/messageTypes.ts` | 4 |
| `chat/types/chatStateTypes.ts` | 5 |
| `mocks/browser.ts` + `server.ts` + `index.ts` | 6 |
| `mocks/handlers/authHandlers.ts` | 7 |
| `mocks/handlers/conversationsHandlers.ts` | 8 |
| `mocks/handlers/messagesHandlers.ts` | 9 |
| `main.tsx` (update) | 10 |
| `chat/api/apiClient.ts` | 11 |
| `chat/api/authApi.ts` | 12 |
| `chat/api/conversationsApi.ts` | 13 |
| `chat/api/messagesApi.ts` | 14 |
| `chat/state/chatActionTypes.ts` | 15 |
| `chat/state/chatActions.ts` | 16 |
| `chat/state/chatInitialState.ts` | 17 |
| `chat/state/chatReducer.ts` | 18 |
| `chat/state/chatContext.ts` | 19 |
| `chat/hooks/useAuth.ts` | 20 |
| `chat/hooks/useScrollToBottom.ts` | 21 |
| `chat/hooks/useConversations.ts` | 22 |
| `chat/hooks/useMessages.ts` | 23 |
| `chat/hooks/useChat.ts` | 24 |
| `components/feedback/LoadingState.tsx` | 25 |
| `components/feedback/ErrorState.tsx` | 26 |
| `components/feedback/ErrorToast.tsx` | 27 |
| `components/conversations/ConversationSkeleton.tsx` | 28 |
| `components/messages/MessageSkeleton.tsx` | 29 |
| `components/conversations/ConversationEmptyState.tsx` | 30 |
| `components/messages/MessageEmptyState.tsx` | 31 |
| `components/auth/AuthScreen.tsx` | 32 |
| `components/messages/MessageItem.tsx` | 33 |
| `components/messages/MessageList.tsx` | 34 |
| `components/messages/MessageInput.tsx` | 35 |
| `components/messages/MessagePanel.tsx` | 36 |
| `components/conversations/ConversationListItem.tsx` | 37 |
| `components/conversations/ConversationList.tsx` | 38 |
| `components/layout/SidebarLayout.tsx` | 39 |
| `components/layout/MainPanelLayout.tsx` | 40 |
| `components/layout/ChatLayout.tsx` | 41 |
| `components/layout/ChatPage.tsx` | 42 |
| `App.tsx` (update) | 43 |
| `index.css` | 44 |
| `vitest.config.ts` + `test-setup.ts` | 45 |
| `__tests__/MessageInput.test.tsx` | 46 |
| `__tests__/ConversationList.test.tsx` | 47 |
| `__tests__/ChatPage.test.tsx` | 48 |
| `__tests__/useChat.test.ts` | 49 |
| `__tests__/MessagePanel.test.tsx` | 50 |
| TypeScript check | 51 |
| ESLint check | 52 |
| API_CONTRACT.md review | 53 |
| PR description | 54 |
