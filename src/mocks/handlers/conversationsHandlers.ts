import { http, HttpResponse } from 'msw';
import type { Conversation } from '@/messenger/conversations/types/conversationTypes';
import { MOCK_CONVERSATION_SEEDS } from '@/mocks/data/mockConversations';
import { enrichConversation } from '@/mocks/utils/enrichConversation';
import { requireAuth } from '@/mocks/handlers/requireAuth';

function sortByLastMessage(list: Conversation[]): Conversation[] {
  return [...list].sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
  );
}

export const conversationsHandlers = [
  http.get('/conversations', ({ request }) => {
    const auth = requireAuth(request);
    if (auth.ok === false) {
      return auth.response;
    }
    const visible = MOCK_CONVERSATION_SEEDS.filter((c) => c.participants.includes(auth.userId));
    const enriched = visible.map((seed) => enrichConversation(seed, auth.userId));
    return HttpResponse.json(sortByLastMessage(enriched));
  }),
];
