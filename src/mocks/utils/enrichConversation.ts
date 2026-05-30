import type { Conversation } from '@/messenger/conversations/types/conversationTypes';
import type { UserId } from '@/messenger/chat/types/userTypes';
import { findUserById } from '@/mocks/data/mockUsers';

const SELF_TITLE = 'You';
const GROUP_AVATAR_URL = '';

export type ConversationSeed = Omit<Conversation, 'title' | 'avatarUrl'>;

function formatParticipantLabel(userId: UserId): string {
  const bare = userId.replace(/^u-/, '');
  if (bare.length === 0) {
    return userId;
  }
  return bare.charAt(0).toUpperCase() + bare.slice(1);
}

function resolvePeerTitle(peerId: UserId): string {
  const user = findUserById(peerId);
  return user?.username ?? formatParticipantLabel(peerId);
}

function resolvePeerAvatarUrl(peerId: UserId): string {
  const user = findUserById(peerId);
  return user?.avatarUrl ?? '';
}

export function enrichConversation(seed: ConversationSeed, viewerId: UserId): Conversation {
  const others = seed.participants.filter((id) => id !== viewerId);
  if (others.length === 0) {
    return {
      ...seed,
      title: SELF_TITLE,
      avatarUrl: resolvePeerAvatarUrl(viewerId),
    };
  }
  if (others.length === 1) {
    const peerId = others[0];
    return {
      ...seed,
      title: resolvePeerTitle(peerId),
      avatarUrl: resolvePeerAvatarUrl(peerId),
    };
  }
  return {
    ...seed,
    title: others.map(resolvePeerTitle).join(', '),
    avatarUrl: GROUP_AVATAR_URL,
  };
}
