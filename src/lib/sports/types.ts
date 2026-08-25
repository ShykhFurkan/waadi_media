export type MatchStatus =
  | 'scheduled'
  | 'live'
  | 'halftime'
  | 'finished'
  | 'postponed'
  | 'cancelled'
  | 'abandoned';

export type MatchPeriod =
  | 'first_half'
  | 'second_half'
  | 'extra_time_first'
  | 'extra_time_second'
  | 'penalties'
  | 'quarter_1'
  | 'quarter_2'
  | 'quarter_3'
  | 'quarter_4'
  | 'innings'
  | 'set'
  | 'unknown';

export type SportType = 'football' | 'cricket' | 'basketball' | 'hockey' | 'tennis';

export interface FootballScore {
  sport: 'football';
  goals: number;
}

export interface CricketScore {
  sport: 'cricket';
  runs: number;
  wickets: number;
  balls: number; // e.g. 112 balls = 18 overs + 4 balls -> 18.4
}

export interface BasketballScore {
  sport: 'basketball';
  points: number;
}

export interface HockeyScore {
  sport: 'hockey';
  goals: number;
}

export interface TennisScore {
  sport: 'tennis';
  sets: { home: number; away: number }[];
  currentGame: { home: string; away: string };
}

export type SportScore = FootballScore | CricketScore | BasketballScore | HockeyScore | TennisScore;

export type MatchEventType =
  | 'goal'
  | 'yellow_card'
  | 'red_card'
  | 'substitution'
  | 'penalty'
  | 'wicket'
  | 'boundary'
  | 'timeout'
  | 'period_start'
  | 'period_end';

export interface MatchEvent {
  id: string;
  type: MatchEventType;
  timestamp: string; // ISO-8601 UTC
  matchMinute?: number;
  playerId?: string;
  playerName?: string;
  teamId?: string;
  description?: string;
}

export interface SportTeam {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  sportId?: string;
  tournamentId?: string;
}

export interface SportMatch {
  id: string;
  sport: SportType;
  status: MatchStatus;
  isFeatured?: boolean;
  sortOrder?: number;
  competition: {
    id: string;
    name: string;
    logoUrl?: string;
    edition?: string;
  };
  scheduledAt: string; // ISO-8601 UTC
  startedAt?: string;  // ISO-8601 UTC
  endedAt?: string;    // ISO-8601 UTC
  venue?: {
    name?: string;
    city?: string;
  };
  homeTeam: SportTeam;
  awayTeam: SportTeam;
  homeScore: SportScore;
  awayScore: SportScore;
  period?: MatchPeriod;
  statusDetail?: string;
  events: MatchEvent[];
  broadcast?: {
    isLive: boolean;
    streamUrl?: string;
    vodUrl?: string;
  };
}

export interface SportTournament {
  id: string;
  name: string;
  slug: string;
  sport: SportType;
  season: string;
  logoUrl?: string;
  description?: string;
  sortOrder?: number;
}

export interface SportLeague {
  id: string;
  name: string;
  slug: string;
  sport: SportType;
  logoUrl?: string;
  standings?: LeagueStanding[];
}

export interface LeagueStanding {
  pos: number;
  team: SportTeam;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface SportPlayer {
  id: string;
  rank: number;
  name: string;
  teamName: string;
  teamLogoUrl?: string;
  avatarUrl?: string;
  goals?: number;
  runs?: number;
  wickets?: number;
  points?: number;
  position?: string;
}

export interface SportStory {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  publishedAt: string; // ISO-8601 UTC
  readTime: string;
  author?: string;
  featured?: boolean;
}

export interface SportNews {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnailUrl: string;
  publishedAt: string; // ISO-8601 UTC
  summary?: string;
}

export interface SportVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  publishedAt: string; // ISO-8601 UTC
  videoUrl?: string;
}

export interface AdSlotProps {
  slot: string;
  format: 'mobile-banner' | 'mobile-large' | 'rectangle' | 'leaderboard' | 'skyscraper';
  className?: string;
}
