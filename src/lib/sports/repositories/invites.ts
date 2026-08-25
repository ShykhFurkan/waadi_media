import { getCompetitions } from './competitions';

export interface TeamInvite {
  token: string;
  competitionId: string;
  competitionName: string;
  passcode: string;
  createdAt: string;
  isUsed: boolean;
}

// Global in-memory invite store
const inviteStore: Record<string, TeamInvite> = {
  'demo-invite-token': {
    token: 'demo-invite-token',
    competitionId: 'ufl-2026',
    competitionName: 'UFL Premier League 2026',
    passcode: '849201',
    createdAt: new Date().toISOString(),
    isUsed: false,
  },
};

function getLocalStorageInvites(): Record<string, TeamInvite> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('waadi_sports_invites');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('[InvitesRepo] Error reading localStorage invites:', e);
  }
  return {};
}

function saveLocalStorageInvite(invite: TeamInvite) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalStorageInvites();
    current[invite.token] = invite;
    localStorage.setItem('waadi_sports_invites', JSON.stringify(current));
  } catch (e) {
    console.warn('[InvitesRepo] Error saving localStorage invite:', e);
  }
}

export async function createTeamInvite(competitionId: string, competitionName: string): Promise<TeamInvite> {
  const token = `inv-${Math.random().toString(36).substring(2, 10)}`;
  const passcode = Math.floor(100000 + Math.random() * 900000).toString();

  const invite: TeamInvite = {
    token,
    competitionId,
    competitionName,
    passcode,
    createdAt: new Date().toISOString(),
    isUsed: false,
  };

  inviteStore[token] = invite;
  saveLocalStorageInvite(invite);
  return invite;
}

export async function getTeamInvite(token: string): Promise<TeamInvite | null> {
  // 1. Check in-memory store
  if (inviteStore[token]) return inviteStore[token];

  // 2. Check localStorage
  const localInvites = getLocalStorageInvites();
  if (localInvites[token]) {
    inviteStore[token] = localInvites[token];
    return localInvites[token];
  }

  // 3. Fallback for demo token only
  if (token === 'demo-invite-token' || token.startsWith('demo-')) {
    const compList = await getCompetitions();
    const firstComp = compList[0];
    return {
      token,
      competitionId: firstComp?.id || 'ufl-2026',
      competitionName: firstComp?.name || 'Kashmir Premier League 2026',
      passcode: '849201',
      createdAt: new Date().toISOString(),
      isUsed: false,
    };
  }

  return null;
}

export async function verifyTeamInvite(token: string, passcode: string): Promise<{ valid: boolean; invite?: TeamInvite; error?: string }> {
  const cleanPasscode = passcode.trim();
  let invite = await getTeamInvite(token);

  // Fallback: If invite object not found by exact token, search local invites by passcode
  if (!invite) {
    const localInvites = getLocalStorageInvites();
    const found = Object.values(localInvites).find((inv) => inv.passcode === cleanPasscode);
    if (found) {
      invite = found;
    }
  }

  if (!invite) {
    return { valid: false, error: 'Invalid or expired registration invite link.' };
  }

  if (invite.passcode !== cleanPasscode) {
    return { valid: false, error: 'Incorrect 6-digit access passcode. Please check passcode provided by tournament admin.' };
  }

  return { valid: true, invite };
}

export async function markInviteUsed(token: string): Promise<void> {
  if (inviteStore[token]) {
    inviteStore[token].isUsed = true;
  }
  const localInvites = getLocalStorageInvites();
  if (localInvites[token]) {
    localInvites[token].isUsed = true;
    try {
      localStorage.setItem('waadi_sports_invites', JSON.stringify(localInvites));
    } catch (e) {}
  }
}
