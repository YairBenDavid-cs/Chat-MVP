import { http, HttpResponse } from 'msw';
import type {
  Message,
  MessageId,
  MessagesPage,
  PaginationCursor,
} from '@/messenger/messages/types/messageTypes';
import type { ConversationId } from '@/messenger/conversations/types/conversationTypes';
import { PAGE_SIZE } from '@/mocks/data/mockMessages';
import { findConversationSeedById } from '@/mocks/data/mockConversations';
import { badRequest, forbidden, notFound } from '@/mocks/handlers/httpErrors';
import { messageStore } from '@/mocks/handlers/messageStore';
import { requireAuth } from '@/mocks/handlers/requireAuth';

const MAX_MESSAGE_LENGTH = 4000;
const SEND_FAILURE_RATE = 0.2;

function encodeCursor(offset: number): string {
  return btoa(String(offset));
}

function decodeCursor(cursor: string): number {
  return parseInt(atob(cursor), 10);
}

function sendFailed(): HttpResponse<{ code: string; message: string }> {
  return HttpResponse.json(
    { code: 'SEND_FAILED', message: 'Simulated failure' },
    { status: 500 },
  );
}

function extractConversationId(raw: string | readonly string[] | undefined): ConversationId | null {
  if (typeof raw !== 'string' || raw.length === 0) { return null; }
  return raw as ConversationId;
}

export const messagesHandlers = [
  http.get('/conversations/:id/messages', ({ params, request }) => {
    const auth = requireAuth(request);
    if (auth.ok === false) { return auth.response; }

    const conversationId = extractConversationId(params['id']);
    if (!conversationId) { return notFound('Conversation not found'); }
    const conversation = findConversationSeedById(conversationId);
    if (!conversation) { return notFound('Conversation not found'); }
    if (!conversation.participants.includes(auth.userId)) {
      return forbidden('Not a participant of this conversation');
    }

    const url = new URL(request.url);
    const cursorParam = url.searchParams.get('cursor');
    const all = messageStore.get(conversationId) ?? [];
    const offset = cursorParam !== null ? decodeCursor(cursorParam) : 0;
    const pageMessages = all.slice(offset, offset + PAGE_SIZE);
    const nextOffset = offset + PAGE_SIZE;
    const nextCursor: PaginationCursor = nextOffset < all.length ? encodeCursor(nextOffset) : null;
    const page: MessagesPage = { messages: pageMessages, nextCursor };
    return HttpResponse.json(page);
  }),

  http.post('/conversations/:id/messages', async ({ params, request }) => {
    const auth = requireAuth(request);
    if (auth.ok === false) { return auth.response; }

    const conversationId = extractConversationId(params['id']);
    if (!conversationId) { return notFound('Conversation not found'); }
    const conversation = findConversationSeedById(conversationId);
    if (!conversation) { return notFound('Conversation not found'); }
    if (!conversation.participants.includes(auth.userId)) {
      return forbidden('Not a participant of this conversation');
    }

    const body = (await request.json().catch(() => null)) as { text?: unknown } | null;
    const text = body?.text;
    if (typeof text !== 'string' || text.length === 0) {
      return badRequest('text is required');
    }
    if (text.length > MAX_MESSAGE_LENGTH) {
      return badRequest(`text must be ${MAX_MESSAGE_LENGTH} characters or fewer`);
    }
    if (Math.random() < SEND_FAILURE_RATE) {
      return sendFailed();
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}` as MessageId,
      conversationId,
      senderId: auth.userId,
      text,
      createdAt: new Date().toISOString(),
    };
    const existing = messageStore.get(conversationId) ?? [];
    messageStore.set(conversationId, [...existing, newMessage]);
    return HttpResponse.json(newMessage);
  }),
];
