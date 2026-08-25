import { supabase } from '@/lib/supabase';
import { SportTournament } from '../types';
import { mapRawSportType } from '../mappers';
import { SPORTS_DEMO_MODE } from '../constants';
import { MOCK_TOURNAMENTS } from '../mock-data';

export async function getTournaments(): Promise<SportTournament[]> {
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*, sports(*)');

    if (error) {
      console.error('[TournamentsRepo] Error fetching tournaments:', error.message);
      return [];
    }

    if (data && data.length > 0) {
      return data.map((t) => ({
        id: t.id,
        name: t.name,
        slug: t.slug || t.id,
        sport: mapRawSportType(t.sports?.slug || t.sports?.name),
        season: t.season || '2026',
        logoUrl: t.logo_url || undefined,
        description: t.description || undefined,
      }));
    }

    return [];
  } catch (err) {
    console.error('[TournamentsRepo] Exception fetching tournaments:', err);
    return [];
  }
}

export async function getTournamentById(id: string): Promise<SportTournament | null> {
  const tournaments = await getTournaments();
  return tournaments.find((t) => t.id === id || t.slug === id) || null;
}
