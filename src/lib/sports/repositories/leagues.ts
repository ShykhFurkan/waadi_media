import { SportLeague } from '../types';
import { SPORTS_DEMO_MODE } from '../constants';
import { MOCK_LEAGUES } from '../mock-data';

export async function getLeagues(): Promise<SportLeague[]> {
  if (SPORTS_DEMO_MODE) {
    return MOCK_LEAGUES;
  }
  return MOCK_LEAGUES;
}

export async function getLeagueById(id: string): Promise<SportLeague | null> {
  const leagues = await getLeagues();
  return leagues.find((l) => l.id === id || l.slug === id) || null;
}
