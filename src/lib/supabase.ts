import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://axqhqyuaymvonfwxzkrz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4cWhxeXVheW12b25md3h6a3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NjAzNzYsImV4cCI6MjEwMzAzNjM3Nn0.fBR8dLN5Q1GzgfGzkmjxv-TVBI1P7CGPyBcPrLaimpU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const FOOTBALL_SPORT_UUID = 'b449e97b-5baa-4aeb-abb7-38229d265e97';
let cachedFootballSportId: string | null = null;

export async function getFootballSportId(): Promise<string> {
  if (cachedFootballSportId) return cachedFootballSportId;
  try {
    const { data } = await supabase
      .from('sports')
      .select('id')
      .or('slug.eq.football,name.ilike.football')
      .limit(1)
      .maybeSingle();

    if (data?.id) {
      cachedFootballSportId = data.id;
      return data.id;
    }
  } catch (e) {
    console.warn('[Supabase] Exception resolving football sport_id:', e);
  }
  return FOOTBALL_SPORT_UUID;
}

export interface Sport {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Tournament {
  id: string;
  sport_id: string;
  name: string;
  slug: string;
  season: string;
  edition?: string;
  logo_url?: string;
  description?: string;
  sports?: Sport;
}

export interface Team {
  id: string;
  sport_id: string;
  tournament_id?: string;
  name: string;
  short_name: string;
  slug: string;
  logo_url?: string;
  tournaments?: Tournament;
}

export interface Player {
  id: string;
  team_id?: string;
  name: string;
  slug: string;
  position?: string;
  jersey_number?: number;
  avatar_url?: string;
  stats_json?: Record<string, any>;
  teams?: Team;
}

export interface Sponsor {
  id: string;
  tournament_id?: string;
  name: string;
  tier?: string;
  logo_url: string;
  website_url?: string;
  tournaments?: Tournament;
}

export interface Match {
  id: string;
  tournament_id?: string;
  sport_id: string;
  home_team_id: string;
  away_team_id: string;
  status: 'upcoming' | 'live' | 'completed';
  scheduled_at: string;
  venue: string;
  home_score: number;
  away_score: number;
  status_detail?: string;
  sponsor_id?: string;
  vod_url?: string;
  tournaments?: Tournament;
  sports?: Sport;
  home_team?: Team;
  away_team?: Team;
  sponsor?: Sponsor;
}

export interface MatchEvent {
  id: string;
  match_id: string;
  event_type: 'goal' | 'card_yellow' | 'card_red' | 'substitution' | 'wicket' | 'four' | 'six' | 'over' | 'period_end';
  team_id?: string;
  player_id?: string;
  match_time: string;
  timestamp: string;
  metadata_json?: Record<string, any>;
  team?: Team;
  player?: Player;
}

export interface Broadcast {
  id: string;
  match_id: string;
  status: 'idle' | 'live' | 'ended';
  active_source_id?: string;
  simulcast_youtube: boolean;
  simulcast_facebook: boolean;
  stream_health: string;
  bitrate: number;
}

// Database Helper Functions

export async function createTournament(tournament: Partial<Tournament>) {
  const sportId = (!tournament.sport_id || tournament.sport_id === 'football')
    ? await getFootballSportId()
    : tournament.sport_id;

  return await supabase
    .from('tournaments')
    .insert({ ...tournament, sport_id: sportId })
    .select()
    .single();
}

export async function createTeam(team: Partial<Team>) {
  const sportId = (!team.sport_id || team.sport_id === 'football')
    ? await getFootballSportId()
    : team.sport_id;

  return await supabase
    .from('teams')
    .insert({ ...team, sport_id: sportId })
    .select()
    .single();
}

export async function createPlayer(player: Partial<Player>) {
  return await supabase.from('players').insert(player).select().single();
}

export async function createSponsor(sponsor: Partial<Sponsor>) {
  return await supabase.from('sponsors').insert(sponsor).select().single();
}

export async function createMatch(match: Partial<Match>) {
  const sportId = (!match.sport_id || match.sport_id === 'football')
    ? await getFootballSportId()
    : match.sport_id;

  return await supabase
    .from('matches')
    .insert({ ...match, sport_id: sportId })
    .select()
    .single();
}

export async function updateMatchStatus(matchId: string, status: 'upcoming' | 'live' | 'completed', statusDetail?: string) {
  const updateData: any = { status };
  if (statusDetail) updateData.status_detail = statusDetail;
  return await supabase.from('matches').update(updateData).eq('id', matchId).select().single();
}

export async function updateMatchScore(matchId: string, homeScore: number, awayScore: number) {
  return await supabase.from('matches').update({ home_score: homeScore, away_score: awayScore }).eq('id', matchId).select().single();
}

export async function deleteMatch(matchId: string) {
  return await supabase.from('matches').delete().eq('id', matchId);
}

export async function deleteTournament(tournamentId: string) {
  return await supabase.from('tournaments').delete().eq('id', tournamentId);
}

export async function deleteTeam(teamId: string) {
  return await supabase.from('teams').delete().eq('id', teamId);
}

export async function deleteSponsor(sponsorId: string) {
  return await supabase.from('sponsors').delete().eq('id', sponsorId);
}
