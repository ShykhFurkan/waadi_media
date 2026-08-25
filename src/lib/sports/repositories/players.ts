import { supabase } from '@/lib/supabase';
import { SportPlayer } from '../types';
import { SPORTS_DEMO_MODE } from '../constants';
import { MOCK_TOP_SCORERS } from '../mock-data';

export async function getPlayers(): Promise<SportPlayer[]> {
  try {
    const { data, error } = await supabase.from('players').select('*, teams(*)');
    if (data && data.length > 0) {
      return data.map((p, idx) => ({
        id: p.id,
        rank: idx + 1,
        name: p.name,
        teamName: p.teams?.name || 'Team',
        avatarUrl: p.avatar_url || undefined,
        goals: p.stats_json?.goals || 0,
        position: p.position || 'Player',
        jerseyNumber: p.jersey_number || (idx + 1),
      }));
    }
    return [];
  } catch (err) {
    console.error('[PlayersRepo] Error fetching players:', err);
    return [];
  }
}

export async function getPlayerById(id: string): Promise<SportPlayer | null> {
  const players = await getPlayers();
  return players.find((p) => p.id === id) || null;
}

export async function getPlayersByTeamId(teamId: string): Promise<Array<{ id: string; name: string; jerseyNumber: number; position: string; goals?: number }>> {
  try {
    const { data } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId)
      .order('jersey_number', { ascending: true });

    if (data && data.length > 0) {
      return data.map((p, idx) => ({
        id: p.id,
        name: p.name,
        jerseyNumber: p.jersey_number || idx + 1,
        position: p.position || 'Forward',
        goals: p.stats_json?.goals || 0,
      }));
    }
  } catch (e) {}

  return [];
}

export async function getTopScorers(): Promise<SportPlayer[]> {
  const players = await getPlayers();
  return [...players].sort((a, b) => (b.goals || 0) - (a.goals || 0)).slice(0, 5);
}
