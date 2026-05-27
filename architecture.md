src/
  main.tsx
  App.tsx
  index.css

  mocks/                      // MSW – mock backend
    handlers/
      authHandlers.ts
      conversationsHandlers.ts
      messagesHandlers.ts
    browser.ts                // setupWorker(...)
    server.ts                 // for tests (optional)
    index.ts                  // startMockWorker()

  features/
    chat/

      API_CONTRACT.md         // documented endpoints + types (in repo root ideally)

      types/
        authTypes.ts          // AuthUser, AuthToken, LoginRequest, LoginResponse
        conversationTypes.ts  // Conversation, ConversationId, ConversationSummary
        messageTypes.ts       // Message, MessageId, PaginationCursor
        chatStateTypes.ts     // ChatState, ChatStatus, ChatError

      api/
        apiClient.ts          // base fetch / mock client wrapper
        authApi.ts            // login(request) → { token, user }
        conversationsApi.ts   // getConversations()
        messagesApi.ts        // getMessages(conversationId, cursor?), sendMessage(...)

      state/
        chatActionTypes.ts    // union/enum of all chat actions
        chatActions.ts        // optional: action creators (sendMessageOptimistic, etc.)
        chatInitialState.ts   // initial ChatState
        chatReducer.ts        // useReducer logic: loading/empty/error/optimistic

      hooks/
        useAuth.ts            // mocked auth state (current user, login/logout)
        useChat.ts            // main chat hook: uses reducer + api; single source of truth
        useConversations.ts   // thin wrapper → exposes only conversations + selectConversation
        useMessages.ts        // thin wrapper → exposes messages + sendMessage + status
        useScrollToBottom.ts  // auto-scroll behavior for message list

      components/

        layout/
          ChatPage.tsx        // feature entry; decides AuthScreen vs ChatLayout
          ChatLayout.tsx      // 2‑column layout (sidebar + main)
          SidebarLayout.tsx   // left column layout
          MainPanelLayout.tsx // right column layout

        auth/
          AuthScreen.tsx      // "log in as user X" UI

        conversations/
          ConversationList.tsx
          ConversationListItem.tsx
          ConversationSkeleton.tsx    // loading skeleton for list
          ConversationEmptyState.tsx  // no conversations UI

        messages/
          MessagePanel.tsx            // composes list + input + toast
          MessageList.tsx
          MessageItem.tsx
          MessageSkeleton.tsx         // loading skeleton for thread
          MessageEmptyState.tsx       // empty thread UI
          MessageInput.tsx            // message composer: controlled textarea, Enter/Shift+Enter

        feedback/
          LoadingState.tsx            // generic loading (can reuse)
          ErrorState.tsx              // generic error block
          ErrorToast.tsx              // toast for failed send


src/features/chat/__tests__/
    ChatPage.test.tsx             // Test 1: Auth → Chat flow
    ConversationList.test.tsx     // Test 2 & 5: selection + loading/empty
    MessageInput.test.tsx         // Test 3: Enter vs Shift+Enter behavior
    MessagePanel.test.tsx         // (optional) integration of list + input + toast
    useChat.test.ts               // Test 4: optimistic send + rollback + error