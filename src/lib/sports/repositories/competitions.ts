import { supabase, Tournament, createTournament as dbCreateTournament, deleteTournament as dbDeleteTournament, getFootballSportId } from '@/lib/supabase';
import { SportTournament, SportTeam } from '../types';
import { mapDbTeam } from '../mappers';
import { MOCK_TOURNAMENTS, MOCK_TEAMS } from '../mock-data';
import { SPORTS_DEMO_MODE } from '../constants';

export interface Competition {
  id: string;
  name: string;
  slug: string;
  type: 'Tournament' | 'League';
  format?: string; // e.g. '11-a-side', '7-a-side', '5-a-side'
  squadSizeRequired?: number;
  maxSubstitutes?: number;
  season: string;
  edition?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  prizePool?: string;
  logoUrl?: string;
  description?: string;
  sponsors?: string[];
  status: 'Draft' | 'Upcoming' | 'Active' | 'Completed';
  registeredTeams?: SportTeam[];
}

// In-memory registration cache for demo / database fallback
const registeredTeamsStore: Record<string, string[]> = {};
const competitionMetadataStore: Record<string, Partial<Competition>> = {};

export async function getCompetitions(): Promise<Competition[]> {
  try {
    const { data, error } = await supabase.from('tournaments').select('*, sports(*)');
    if (data && data.length > 0) {
      return data.map((t) => {
        const meta = competitionMetadataStore[t.id] || {};
        return {
          id: t.id,
          name: t.name,
          slug: t.slug,
          type: (t.name.toLowerCase().includes('league') ? 'League' : 'Tournament') as 'Tournament' | 'League',
          format: meta.format || '11-a-side',
          squadSizeRequired: meta.squadSizeRequired || 18,
          maxSubstitutes: meta.maxSubstitutes || 5,
          season: t.season || '2026',
          edition: t.edition || '1st Edition',
          location: meta.location || 'Central Sports Complex',
          prizePool: meta.prizePool || '₹250,000 + Trophy',
          logoUrl: t.logo_url,
          description: t.description,
          sponsors: meta.sponsors || ['Kashmir Willow Crafts', 'Valley Athletics'],
          status: 'Active',
        };
      });
    }
    if (SPORTS_DEMO_MODE) {
      return MOCK_TOURNAMENTS.map((t) => {
        const meta = competitionMetadataStore[t.id] || {};
        return {
          id: t.id,
          name: t.name,
          slug: t.slug,
          type: t.name.toLowerCase().includes('league') ? 'League' : 'Tournament',
          format: meta.format || '11-a-side',
          squadSizeRequired: meta.squadSizeRequired || 18,
          maxSubstitutes: meta.maxSubstitutes || 5,
          season: t.season || '2026',
          edition: '1st Edition',
          location: meta.location || 'Valley Sports Stadium',
          prizePool: meta.prizePool || '₹500,000 + Championship Trophy',
          logoUrl: t.logoUrl,
          description: t.description,
          sponsors: meta.sponsors || ['Kashmir Willow Crafts', 'Valley Athletics'],
          status: 'Active',
        };
      });
    }
    return [];
  } catch (err) {
    console.error('[CompetitionsRepo] Error fetching competitions:', err);
    if (SPORTS_DEMO_MODE) {
      return MOCK_TOURNAMENTS.map((t) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        type: t.name.toLowerCase().includes('league') ? 'League' : 'Tournament',
        format: '11-a-side',
        squadSizeRequired: 18,
        maxSubstitutes: 5,
        season: t.season || '2026',
        edition: '1st Edition',
        location: 'Valley Sports Stadium',
        prizePool: '₹500,000 + Championship Trophy',
        logoUrl: t.logoUrl,
        description: t.description,
        sponsors: ['Kashmir Willow Crafts'],
        status: 'Active',
      }));
    }
    return [];
  }
}

export async function getCompetitionById(id: string): Promise<Competition | null> {
  const competitions = await getCompetitions();
  const comp = competitions.find((c) => c.id === id);
  if (!comp) return null;

  const regTeams = await getRegisteredTeams(id);
  return {
    ...comp,
    registeredTeams: regTeams,
  };
}

export async function createCompetition(compData: {
  name: string;
  type: 'Tournament' | 'League';
  format?: string;
  squadSizeRequired?: number;
  maxSubstitutes?: number;
  season?: string;
  edition?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  prizePool?: string;
  logoUrl?: string;
  description?: string;
  sponsors?: string[];
}) {
  const slug = compData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const sportId = await getFootballSportId();
  const res = await dbCreateTournament({
    sport_id: sportId,
    name: compData.name,
    slug,
    season: compData.season || '2026',
    edition: compData.edition || '1st Edition',
    logo_url: compData.logoUrl,
    description: compData.description,
  });

  if (res.data) {
    competitionMetadataStore[res.data.id] = {
      format: compData.format,
      squadSizeRequired: compData.squadSizeRequired,
      maxSubstitutes: compData.maxSubstitutes,
      location: compData.location,
      prizePool: compData.prizePool,
      sponsors: compData.sponsors,
    };
  }

  return res;
}

export async function deleteCompetition(id: string) {
  return await dbDeleteTournament(id);
}

export async function registerTeamsToCompetition(competitionId: string, teamIds: string[]): Promise<boolean> {
  if (!registeredTeamsStore[competitionId]) {
    registeredTeamsStore[competitionId] = [];
  }

  const existingSet = new Set(registeredTeamsStore[competitionId]);
  const newTeamIds = teamIds.filter((id) => !existingSet.has(id));

  registeredTeamsStore[competitionId].push(...newTeamIds);

  try {
    for (const tid of newTeamIds) {
      await supabase.from('teams').update({ tournament_id: competitionId }).eq('id', tid);
    }
  } catch (e) {
    console.warn('[CompetitionsRepo] Team binding exception:', e);
  }

  return true;
}

export async function getRegisteredTeams(competitionId: string): Promise<SportTeam[]> {
  try {
    const { data } = await supabase.from('teams').select('*').eq('tournament_id', competitionId);
    if (data && data.length > 0) {
      return data.map((t) => mapDbTeam(t));
    }
  } catch (e) {
    // fallback
  }

  const ids = registeredTeamsStore[competitionId] || [];
  if (ids.length > 0) {
    return MOCK_TEAMS.filter((t) => ids.includes(t.id));
  }
  return MOCK_TEAMS.slice(0, 4);
}
