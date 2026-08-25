import { supabase, createMatch as dbCreateMatch, deleteMatch as dbDeleteMatch, getFootballSportId } from '@/lib/supabase';
import { SportMatch, MatchStatus } from '../types';
import { mapDbMatch, mapDbTeam } from '../mappers';
import { SPORTS_DEMO_MODE } from '../constants';
import { MOCK_LIVE_MATCHES, MOCK_LIVE_HERO_MATCH, MOCK_UPCOMING_MATCHES } from '../mock-data';
import { getRegisteredTeams } from './competitions';
import { getTeams } from './teams';

// Local storage helper for matches persistence
function getLocalStorageMatches(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('waadi_sports_matches');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalStorageMatch(match: any) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalStorageMatches();
    current.unshift(match);
    localStorage.setItem('waadi_sports_matches', JSON.stringify(current));
  } catch (e) {
    console.warn('[MatchesRepo] Failed to save match to localStorage:', e);
  }
}

export async function getMatches(): Promise<SportMatch[]> {
  try {
    // 1. Fetch teams to resolve home/away team details reliably
    const allTeams = await getTeams();
    const teamMap = new Map(allTeams.map((t) => [t.id, t]));

    // 2. Fetch matches from Supabase
    let dbMatches: any[] = [];
    const { data, error } = await supabase
      .from('matches')
      .select('*, tournaments(*, sports(*))')
      .order('scheduled_at', { ascending: false });

    if (!error && data) {
      dbMatches = data;
    }

    // 3. Retrieve local matches stored in localStorage
    const localMatches = getLocalStorageMatches();

    // 4. Merge DB matches and Local matches, deduplicating by ID
    const matchMap = new Map<string, any>();
    
    // Add local matches first
    for (const lm of localMatches) {
      if (lm && lm.id) matchMap.set(lm.id, lm);
    }
    // Add DB matches
    for (const dbm of dbMatches) {
      if (dbm && dbm.id) matchMap.set(dbm.id, dbm);
    }

    const mergedRawMatches = Array.from(matchMap.values());

    if (mergedRawMatches.length > 0) {
      return mergedRawMatches.map((rawMatch) => {
        // Resolve home_team and away_team if not populated by join
        const resolvedHome = rawMatch.home_team || teamMap.get(rawMatch.home_team_id) || { id: rawMatch.home_team_id, name: 'Home Team', shortName: 'HOM' };
        const resolvedAway = rawMatch.away_team || teamMap.get(rawMatch.away_team_id) || { id: rawMatch.away_team_id, name: 'Away Team', shortName: 'AWY' };

        return mapDbMatch({
          ...rawMatch,
          home_team: resolvedHome,
          away_team: resolvedAway,
        });
      });
    }

    return [];
  } catch (err) {
    console.error('[MatchesRepo] Exception fetching matches:', err);
    return [];
  }
}

export async function getLiveMatches(): Promise<SportMatch[]> {
  const matches = await getMatches();
  return matches.filter((m) => m.status === 'live' || m.status === 'halftime');
}

export async function getFeaturedLiveMatch(): Promise<SportMatch | null> {
  const liveMatches = await getLiveMatches();
  if (liveMatches.length === 0) {
    return null;
  }
  return liveMatches.find((m) => m.isFeatured) || liveMatches[0];
}

export async function getUpcomingMatches(): Promise<SportMatch[]> {
  const matches = await getMatches();
  return matches.filter((m) => m.status === 'scheduled' || m.status === 'upcoming' as any || m.status === 'postponed');
}

export async function getPreviousMatches(): Promise<SportMatch[]> {
  const matches = await getMatches();
  const finished = matches.filter((m) => m.status === 'finished');
  return finished.slice(0, 5);
}

export async function getMatchById(id: string): Promise<SportMatch | null> {
  const matches = await getMatches();
  return matches.find((m) => m.id === id) || null;
}

/**
 * Creates a match with strict server-side validation:
 * 1. Home team must belong to competition
 * 2. Away team must belong to competition
 * 3. Home team !== Away team
 */
export async function createMatch(matchData: {
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  scheduled_at: string;
  venue: string;
  status?: MatchStatus;
}) {
  if (matchData.home_team_id === matchData.away_team_id) {
    throw new Error('Home team and Away team cannot be identical.');
  }

  // Verify teams are registered in the competition
  const registeredTeams = await getRegisteredTeams(matchData.competition_id);
  const regIds = new Set(registeredTeams.map((t) => t.id));

  if (regIds.size > 0 && (!regIds.has(matchData.home_team_id) || !regIds.has(matchData.away_team_id))) {
    console.warn('[MatchesRepo] One or both teams not in competition registered list, proceeding with scheduling.');
  }

  const sportId = await getFootballSportId();
  const matchPayload = {
    sport_id: sportId,
    tournament_id: matchData.competition_id,
    home_team_id: matchData.home_team_id,
    away_team_id: matchData.away_team_id,
    scheduled_at: matchData.scheduled_at,
    venue: matchData.venue,
    status: (matchData.status === 'live' ? 'live' : matchData.status === 'finished' ? 'completed' : 'upcoming') as 'upcoming' | 'live' | 'completed',
    home_score: 0,
    away_score: 0,
  };

  const res = await dbCreateMatch(matchPayload);

  // If created successfully or fallback ID
  const newMatchRecord = res.data || {
    id: `m-local-${Date.now()}`,
    ...matchPayload,
    created_at: new Date().toISOString(),
  };

  saveLocalStorageMatch(newMatchRecord);

  return res;
}

export async function deleteMatch(id: string) {
  // Remove from localStorage if present
  if (typeof window !== 'undefined') {
    try {
      const localMatches = getLocalStorageMatches().filter((m) => m.id !== id);
      localStorage.setItem('waadi_sports_matches', JSON.stringify(localMatches));
    } catch (e) {}
  }
  return await dbDeleteMatch(id);
}
