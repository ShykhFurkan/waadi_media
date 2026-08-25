import { supabase, Team, createTeam as dbCreateTeam, deleteTeam as dbDeleteTeam, createPlayer as dbCreatePlayer, getFootballSportId } from '@/lib/supabase';
import { SportTeam } from '../types';
import { mapDbTeam } from '../mappers';
import { MOCK_TEAMS } from '../mock-data';
import { SPORTS_DEMO_MODE } from '../constants';

export async function getTeams(): Promise<SportTeam[]> {
  try {
    const { data, error } = await supabase.from('teams').select('*, tournaments(*)');
    if (error) {
      console.error('[TeamsRepo] Error fetching teams:', error.message);
    }
    if (data && data.length > 0) {
      return data.map((t) => mapDbTeam(t));
    }
    return [];
  } catch (err) {
    console.error('[TeamsRepo] Exception fetching teams:', err);
    return [];
  }
}

export async function getTeamById(id: string): Promise<SportTeam | null> {
  const teams = await getTeams();
  return teams.find((t) => t.id === id) || null;
}

export async function createTeam(teamData: {
  name: string;
  short_name: string;
  location?: string;
  manager?: string;
  contact_email?: string;
  contact_phone?: string;
  description?: string;
  logo_url?: string;
  tournament_id?: string;
  players?: Array<{ name: string; jerseyNumber: number; position: string }>;
}) {
  const slug = teamData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const sportId = await getFootballSportId();
  
  const res = await dbCreateTeam({
    sport_id: sportId,
    tournament_id: teamData.tournament_id,
    name: teamData.name,
    short_name: teamData.short_name.toUpperCase(),
    slug,
    logo_url: teamData.logo_url,
  });

  if (res.data && teamData.players && teamData.players.length > 0) {
    for (const p of teamData.players) {
      try {
        const pSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        await dbCreatePlayer({
          team_id: res.data.id,
          name: p.name,
          slug: pSlug,
          jersey_number: p.jerseyNumber || 10,
          position: p.position || 'Forward',
        });
      } catch (e) {
        console.warn('[TeamsRepo] Exception adding player:', e);
      }
    }
  }

  return res;
}

export async function deleteTeam(id: string) {
  return await dbDeleteTeam(id);
}
