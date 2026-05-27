# CLAUDE.md — Chat MVP Development Guide

## Project Overview

A React + Vite + TypeScript chat UI with a mocked backend (MSW). Two-column layout: conversation list on the left, message thread + composer on the right. Key feature: **optimistic message sends with rollback on failure**.

**Stack:** React 19, TypeScript 6 (strict), Vite 8, MSW for mocking, Vitest + React Testing Library.

See `architecture.md` for the full file tree, `TODO.md` for the phase-by-phase build order, and `projectConstrains.md` for acceptance criteria.

---

## Absolute Rules — Never Break These

### 1. No Nested JSX
Every component's `return` must contain **only `<ComponentName />` references** — no raw HTML tags nested inside other tags.

```tsx
// ❌ FORBIDDEN — nested HTML elements
function MessagePanel() {
  return (
    <div className="panel">
      <div className="header">
        <h1>Chat</h1>
        <span>subtitle</span>
      </div>
      <ul>
        {messages.map(m => <li key={m.id}>{m.text}</li>)}
      </ul>
    </div>
  );
}

// ✅ REQUIRED — flat, composed components
function MessagePanel() {
  return (
    <PanelContainer>
      <PanelHeader />
      <MessageList messages={messages} />
    </PanelContainer>
  );
}
```

If you find yourself nesting `<div>` inside `<div>`, stop and extract a component. Name it after what it represents, not what it looks like (`<ConversationMeta />` not `<LeftDiv />`).

### 2. Short, Intentional Returns
Every `return` statement should be readable at a glance. If you need to read the return to understand the component's shape, it is too long. Aim for 3–8 lines in a return block.

```tsx
// ❌ Too long — extract pieces
return (
  <div>
    {isLoading && <div className="spinner"><span>Loading...</span></div>}
    {error && <div className="error"><p>{error.message}</p><button onClick={retry}>Retry</button></div>}
    {data && data.map(item => <div key={item.id}>{item.name}</div>)}
  </div>
);

// ✅ Clear intent at a glance
if (isLoading) return <LoadingState />;
if (error) return <ErrorState message={error.message} onRetry={retry} />;
return <ItemList items={data} />;
```

### 3. No `any`
Every value, parameter, return type, and variable must have an explicit TypeScript type. If you don't know the type, look in `src/chat/types/`. If the type doesn't exist there yet, create it first.

```ts
// ❌ Banned
const handleResponse = (data: any) => { ... }

// ✅ Required
const handleResponse = (data: LoginResponse): void => { ... }
```

### 4. Explicit Return Types on All Functions and Components
Every function, hook, and component must declare its return type explicitly.

```ts
// ❌ Missing return type
export function useAuth() {
  return { user, login };
}

// ✅ Explicit return type
export function useAuth(): AuthHookResult {
  return { user, login };
}
```

### 5. TypeScript Must Pass After Every Phase
Run `npx tsc --noEmit` after completing each phase. Fix all errors before continuing. Do not accumulate TypeScript debt.

---

## File & Folder Organization

### Guiding Principle: One Concern Per File
Prefer **more small files over fewer large files**. If a file has more than one clear responsibility, split it.

```
One file = one component  OR  one hook  OR  one type group  OR  one API function
```

### Project Structure

```
src/
  main.tsx                          # Entry point only — boots MSW, renders App
  App.tsx                           # Root: <ChatProvider><ChatPage /></ChatProvider>
  index.css                         # Global styles, CSS custom properties, keyframes

  mocks/                            # MSW mock backend — completely isolated from app logic
    browser.ts                      # setupWorker(...)
    server.ts                       # setupServer(...) for tests
    index.ts                        # startMockWorker() — called by main.tsx
    handlers/
      authHandlers.ts
      conversationsHandlers.ts
      messagesHandlers.ts

  chat/                             # The entire chat feature — self-contained
    types/                          # Pure TypeScript types — zero imports from app code
      authTypes.ts
      conversationTypes.ts
      messageTypes.ts
      chatStateTypes.ts

    api/                            # Network boundary — fetch calls live here ONLY
      apiClient.ts                  # Base apiFetch<T> wrapper, token management
      authApi.ts
      conversationsApi.ts
      messagesApi.ts

    state/                          # Reducer, actions, context — no JSX here
      chatActionTypes.ts            # String constants for every action
      chatActions.ts                # Typed action creators
      chatInitialState.ts           # The zero-state of the app
      chatReducer.ts                # Pure function: (state, action) => newState
      chatContext.ts                # ChatProvider + useChatContext hook

    hooks/                          # Custom hooks — logic only, no JSX
      useAuth.ts
      useChat.ts
      useConversations.ts
      useMessages.ts
      useScrollToBottom.ts

    components/                     # Display layer — reads from hooks, no direct API calls
      layout/
        ChatPage.tsx                # Auth gate + top-level composition
        ChatLayout.tsx              # 2-column flex shell
        SidebarLayout.tsx           # <aside> wrapper
        MainPanelLayout.tsx         # <main> wrapper

      auth/
        AuthScreen.tsx

      conversations/
        ConversationList.tsx
        ConversationListItem.tsx
        ConversationSkeleton.tsx
        ConversationEmptyState.tsx

      messages/
        MessagePanel.tsx
        MessageList.tsx
        MessageItem.tsx
        MessageSkeleton.tsx
        MessageEmptyState.tsx
        MessageInput.tsx

      feedback/
        LoadingState.tsx
        ErrorState.tsx
        ErrorToast.tsx

    __tests__/
      ChatPage.test.tsx
      ConversationList.test.tsx
      MessageInput.test.tsx
      MessagePanel.test.tsx
      useChat.test.ts
```

### When to Create a New File
- A component has sub-elements that would nest JSX → extract each into its own file or as a named sub-component at the bottom of the file
- A file exceeds ~100 lines of logic (not counting types/imports) → split it
- Two files import from each other in a cycle → introduce a third file for the shared type/util
- A utility function could be used in more than one place → move it to a shared `utils/` file

---

## Naming Conventions

### Components
- **PascalCase** for all component names and their files: `MessageItem.tsx`, `ErrorToast.tsx`
- Name components after **what they represent**, not what they do or what HTML they render
  - ✅ `ConversationMeta` — represents the textual metadata of a conversation
  - ❌ `LeftTextSection` — describes structure, not meaning

### Hooks
- **camelCase** prefixed with `use`: `useAuth`, `useScrollToBottom`, `useChatContext`
- Name hooks after **what state/behavior they encapsulate**, not the component they're used in
  - ✅ `useConversations` — returns conversation state
  - ❌ `useSidebarData` — tied to a specific UI location

### Types and Interfaces
- **PascalCase**: `AuthUser`, `ChatState`, `MessageId`
- Branded types for IDs: `type ConversationId = string & { readonly __brand: 'ConversationId' }`
- Group related types in the same `*Types.ts` file

### State Actions
- **SCREAMING_SNAKE_CASE** constants: `AUTH_LOGIN_SUCCESS`, `MESSAGE_SEND_OPTIMISTIC`
- Action creators: camelCase matching the constant — `loginSuccess()`, `messageOptimistic()`

### CSS Classes
- **kebab-case**: `.message-bubble-mine`, `.conversation-list-item`, `.error-toast`
- Use **semantic names** that describe the element's role, not its appearance
  - ✅ `.message-bubble-optimistic` 
  - ❌ `.message-half-opacity`

### Variables and Functions
- **camelCase** for everything else
- Booleans: prefix with `is`, `has`, or `can` — `isLoading`, `hasSelection`, `canSend`
- Event handlers: prefix with `handle` — `handleKeyDown`, `handleSelectConversation`
- Async functions: name them as actions — `fetchConversations()`, `sendMessage()`, `login()`

---

## Separation of Concerns — The Strict Layering

Each layer communicates **only with adjacent layers**. A component never calls `fetch`. A type file never imports a hook.

```
Types → API → State → Hooks → Components
  ↑       ↑      ↑       ↑         ↑
  no      no     no      no        reads
imports  imports imports imports   from hooks
  ↓       ↓      ↓       ↓
```

### Types Layer (`chat/types/`)
- Only TypeScript `type` and `interface` declarations
- Zero imports from any other app file
- All other layers import from here

### API Layer (`chat/api/`)
- All `fetch` / `apiFetch` calls live here — nowhere else
- Returns typed responses; throws typed `ChatError` on failure
- No React, no hooks, no state

### State Layer (`chat/state/`)
- Pure reducer logic and action creators
- `chatContext.ts` is the only file here allowed to use React
- No API calls — the hooks call the API and dispatch results

### Hooks Layer (`chat/hooks/`)
- Reads from context via `useChatContext()`
- Calls API functions and dispatches actions
- Returns a typed, minimal public interface to components
- No JSX — hooks return data and callbacks, never elements

### Components Layer (`chat/components/`)
- Calls hooks to get data; never calls `apiFetch` or `dispatch` directly
- Renders UI using the flat `<Component />` JSX rule
- "Smart" container components (e.g. `MessagePanel`) call hooks internally
- "Dumb" display components (e.g. `MessageItem`) receive all data as props

---

## Component Patterns

### Container vs. Display Components

**Container components** own data from hooks:
```tsx
// MessagePanel.tsx — container
function MessagePanel(): JSX.Element {
  const { messages, status, sendError, sendMessage, dismissSendError } = useMessages();
  const { user } = useAuth();

  if (status === 'loading') return <MessageSkeleton />;
  if (status === 'error') return <ErrorState message="Failed to load messages" />;

  return (
    <MessagePanelLayout>
      <MessageList messages={messages} currentUserId={user!.id} />
      <MessageInput onSend={sendMessage} />
      {sendError && <ErrorToast message={sendError.message} onDismiss={dismissSendError} />}
    </MessagePanelLayout>
  );
}
```

**Display components** receive all data as props:
```tsx
// MessageItem.tsx — display
function MessageItem({ message, currentUserId }: MessageItemProps): JSX.Element {
  const isOwn = message.senderId === currentUserId;

  return (
    <MessageBubble isOwn={isOwn} isOptimistic={message.isOptimistic ?? false}>
      <MessageText text={message.text} />
      <MessageTimestamp timestamp={message.createdAt} />
    </MessageBubble>
  );
}
```

### Sub-Component Pattern
When a component needs internal structure, define sub-components in the same file if they're tiny and not reused elsewhere — or extract to their own file if they could be reused.

```tsx
// At the bottom of MessageInput.tsx — not exported, used only here
function ComposerTextarea({ value, onChange, onKeyDown, disabled }: ComposerTextareaProps) {
  return (
    <textarea
      className="composer-textarea"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      rows={1}
    />
  );
}

function SendButton({ onClick, disabled }: SendButtonProps) {
  return (
    <button className="send-button" onClick={onClick} disabled={disabled}>
      Send
    </button>
  );
}

// The exported component uses them flat
export function MessageInput({ onSend, disabled = false }: MessageInputProps): JSX.Element {
  const [text, setText] = useState('');

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (text.trim()) {
        onSend(text.trim());
        setText('');
      }
    }
  }

  return (
    <ComposerForm>
      <ComposerTextarea value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled} />
      <SendButton onClick={() => onSend(text)} disabled={disabled || !text.trim()} />
    </ComposerForm>
  );
}
```

### Props Interface Pattern
Always define a named props interface above the component:

```tsx
// ✅ Named interface — searchable, reusable, self-documenting
interface MessageItemProps {
  message: Message;
  currentUserId: string;
}

function MessageItem({ message, currentUserId }: MessageItemProps): JSX.Element { ... }

// ❌ Inline — harder to read and can't be referenced externally
function MessageItem({ message, currentUserId }: { message: Message; currentUserId: string }): JSX.Element { ... }
```

---

## State Management Patterns

### Reducer Rules
- The reducer must be a **pure function**: same inputs → same outputs, no side effects
- Every case returns a new state object — never mutate `state`
- Optimistic updates: add the message immediately with `isOptimistic: true`
- Rollback: filter out the message by its `tempId`
- Success: map over messages and replace the optimistic one with the real one

### Context Rules
- Only `chatContext.ts` exposes the `useChatContext` hook — no other file touches `useContext` for this context
- Components never use `useChatContext` directly — they use the domain hooks (`useAuth`, `useMessages`, etc.)
- The context value type must be explicitly declared: `{ state: ChatState; dispatch: React.Dispatch<ChatAction> }`

### Action Creator Rules
- One action creator per action type constant
- Always use `as const` on the returned object for proper TypeScript narrowing
- Name them after the event, not the mutation — `loginSuccess()` not `setUser()`

---

## TypeScript Rules

### Branded Types for IDs
Never use `string` where a specific ID type is expected. Use branded types:

```ts
type ConversationId = string & { readonly __brand: 'ConversationId' };
type MessageId = string & { readonly __brand: 'MessageId' };
```

### Union Types for Status
Use explicit union types for loading states — never ad hoc strings:

```ts
type ChatStatus = 'idle' | 'loading' | 'success' | 'error';
```

### Exhaustive Switch Statements
In the reducer and anywhere you switch on a union type, handle every case. TypeScript will catch unhandled cases if you add a `default: assertNever(action)` helper.

### Avoid Type Assertions
`as SomeType` is a last resort. If you find yourself using `as`, it usually means a type is missing or wrong upstream. Fix the source.

The only acceptable `as const` use is in action creators. The only acceptable `as SomeId` is when creating branded types at the API boundary.

---

## Code Quality Checklist

Before completing any phase, verify:

- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm run lint` — zero warnings or errors  
- [ ] No nested JSX in any component
- [ ] Every `return` is ≤ 10 lines
- [ ] Every function has an explicit return type
- [ ] No `any` types
- [ ] No `console.log` left in code (use a comment `// TODO: remove` if debugging)
- [ ] Every new file follows the naming convention
- [ ] Every component has a named `Props` interface
- [ ] Every hook returns a named interface type

---

## ESLint Policy

The ESLint config enforces industry-standard formatting and correctness. Rules enforced:

- **Line length:** max 100 characters (enforced by `max-len`)
- **Trailing commas:** always in multi-line structures (`trailing-comma: all`)
- **Semicolons:** always
- **Single quotes** for strings
- **Arrow function bodies:** avoid unnecessary braces
- **No unused variables** — prefix with `_` if intentionally unused
- **No console** — use comments for debug traces
- **Consistent spacing:** enforced by eslint stylistic rules

Run `npm run lint` and fix all issues before committing.

---

## Development Workflow

1. Build phases in order as defined in `TODO.md` — each phase has explicit dependencies
2. After every phase: `npx tsc --noEmit` then `npm run dev` to verify in browser
3. Follow the file-creation order in `TODO.md` — types before API before state before hooks before components
4. When stuck on a type: look in `src/chat/types/` first before creating a new one
5. When stuck on a component: check if there's a simpler hook or sub-component that should be extracted first

---

## What This Project Is NOT

- Not a state management library showcase — `useReducer` + Context is intentionally simple
- Not styled with a UI library — plain CSS classes only (`index.css`)
- Not server-side rendered — pure client-side SPA
- Not paginating in the UI yet — cursor pagination is in the mock and types but the UI just loads the first page
- Not doing real authentication — MSW fakes the entire auth flow

---

## API Contract Reference

All endpoints are documented in `API_CONTRACT.md`. The mock handlers in `src/mocks/handlers/` must implement this contract exactly. The TypeScript types in `src/chat/types/` must match this contract exactly. These three sources of truth must stay in sync.

| Endpoint | Purpose |
|---|---|
| `POST /auth/login` | Returns `{ token, user }` for a given `userId` |
| `GET /conversations` | Returns all conversations sorted by `lastMessageAt` desc |
| `GET /conversations/:id/messages?cursor=` | Returns paginated `{ messages, nextCursor }` |
| `POST /conversations/:id/messages` | Creates message; fails 20% of the time for testing rollback |
