# Week 2 — Chat MVP: A Contract-First, Mock-Backed Messenger
## summary

This PR delivers the Week 2 chat MVP: a fully client-side messenger backed by an
[MSW](https://mswjs.io/) mock that implements our shared API contract. It spans four
feature slices — login/auth, the chat shell, conversations, and messages — each with its own
typed state (`useReducer` + context), hooks, and components. Messages send optimistically with
rollback and error toasts, conversations paginate by opaque cursor, and a seeded mock simulates
authentication, pagination, and a 20% send-failure rate. Because the same contract will be served
by a real backend in Week 3, the single typed `apiClient` stays the only swap point.

## API Contract

The source of truth for every endpoint, model, and error shape lives in
[`API_CONTRACT.md`](./API_CONTRACT.md). The MSW mock (`src/mocks/`) and the Week 3 backend both
implement it; the client reaches it through one typed module, `src/shared/api/apiClient.ts`.

## States & Components

**Auth / session** — `login/state/loginReducer` + `loginFormContext`, `chat/state/chatReducer` +
`chatContext`. Hooks: `useAuth`, `useAuthBootstrap`, `useLoginForm`. UI: `LoginScreen`, `ChatPage`/`ChatLayout`.

**Conversations** — `conversationsReducer`, `conversationListContext`, `conversationRowContext`.
Hooks: `useConversations`, `useConversationListView`, `useConversationSearch`, `useEscapeToDeselect`.
UI: `ConversationList` (with search, items, empty/no-results states).

**Messages** — `messagesReducer` composed of `messagesFetchReducer` + `messagesSendReducer`, plus
`composerContext` and `messagePanelContext`. Hooks: `useMessages`, `useComposer`, `useMessagePanelView`,
`useMessageSendHandler`, `useScrollToBottom`. UI: `MessagePanel` (list, item, skeleton, empty state,
composer, send-error toast).

**Shared** — `ErrorState`, `ErrorToast`, `LoadingState`, `useAutoDismiss`.

**Mock** — seeded users/conversations/messages, auth + conversations + messages handlers, token store,
and cursor pagination under `src/mocks/`.

## Key Tradeoffs

- **Contract-first mock over a real backend** — MSW lets the full UI ship and be tested in Week 2;
  the typed `apiClient` is the single seam to swap for Week 3.
- **Optimistic send + simulated 20% failure** — surfaces rollback and error-toast paths now rather
  than discovering them against a live server later.
- **Per-slice `useReducer` + context** instead of a global store — keeps state local and dependency-free,
  at the cost of some context plumbing.
- **Deep component decomposition (slot pattern)** — many small, single-purpose files favor readability
  and reuse over file-tree locality.
- **Branded ID types & cursor pagination** — opaque on the wire, type-safe in the client; matches the
  contract without leaking implementation details.

## How to verify

1. `npm install && npm run dev`, log in as `Alice / password123`.
2. Open a conversation, scroll to load older pages (cursor pagination), send messages.
3. Send repeatedly to trigger the ~20% simulated failure — confirm optimistic rollback + error toast.
4. `npm test` for the unit tests (`useComposer`, `ErrorToast`, `App`).
