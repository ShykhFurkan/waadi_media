import { SportMatch, SportScore, SportTeam, SportTournament, SportPlayer, SportType, MatchStatus } from './types';

export function mapRawSportType(sportNameOrSlug?: string): SportType {
  if (!sportNameOrSlug) return 'football';
  const lower = sportNameOrSlug.toLowerCase();
  if (lower.includes('cricket')) return 'cricket';
  if (lower.includes('basket')) return 'basketball';
  if (lower.includes('hockey')) return 'hockey';
  if (lower.includes('tennis')) return 'tennis';
  return 'football';
}

export function mapRawStatus(status?: string): MatchStatus {
  if (!status) return 'scheduled';
  const lower = status.toLowerCase();
  if (lower === 'live') return 'live';
  if (lower === 'halftime' || lower === 'ht') return 'halftime';
  if (lower === 'completed' || lower === 'finished' || lower === 'ft') return 'finished';
  if (lower === 'postponed') return 'postponed';
  if (lower === 'cancelled') return 'cancelled';
  if (lower === 'abandoned') return 'abandoned';
  return 'scheduled';
}

export function mapRawScore(sport: SportType, homeScoreNum: number, awayScoreNum: number, statusDetail?: string): { homeScore: SportScore; awayScore: SportScore } {
  switch (sport) {
    case 'cricket':
      return {
        homeScore: { sport: 'cricket', runs: homeScoreNum || 0, wickets: 0, balls: 0 },
        awayScore: { sport: 'cricket', runs: awayScoreNum || 0, wickets: 0, balls: 0 },
      };
    case 'basketball':
      return {
        homeScore: { sport: 'basketball', points: homeScoreNum || 0 },
        awayScore: { sport: 'basketball', points: awayScoreNum || 0 },
      };
    case 'hockey':
      return {
        homeScore: { sport: 'hockey', goals: homeScoreNum || 0 },
        awayScore: { sport: 'hockey', goals: awayScoreNum || 0 },
      };
    case 'tennis':
      return {
        homeScore: { sport: 'tennis', sets: [], currentGame: { home: '0', away: '0' } },
        awayScore: { sport: 'tennis', sets: [], currentGame: { home: '0', away: '0' } },
      };
    case 'football':
    default:
      return {
        homeScore: { sport: 'football', goals: homeScoreNum || 0 },
        awayScore: { sport: 'football', goals: awayScoreNum || 0 },
      };
  }
}

export function mapDbTeam(rawTeam: any, defaultSport: SportType = 'football'): SportTeam {
  if (!rawTeam) {
    return { id: 'team-unknown', name: 'TBD Team', shortName: 'TBD' };
  }
  return {
    id: rawTeam.id || 'team-unknown',
    name: rawTeam.name || 'Unknown Team',
    shortName: rawTeam.short_name || rawTeam.name?.substring(0, 3)?.toUpperCase() || 'TM',
    logoUrl: rawTeam.logo_url || undefined,
  };
}

export function mapDbMatch(rawMatch: any): SportMatch {
  const sport = mapRawSportType(rawMatch.sports?.slug || rawMatch.sports?.name || rawMatch.tournaments?.sports?.slug);
  const status = mapRawStatus(rawMatch.status);

  const homeTeam = mapDbTeam(rawMatch.home_team, sport);
  const awayTeam = mapDbTeam(rawMatch.away_team, sport);
  const { homeScore, awayScore } = mapRawScore(sport, rawMatch.home_score || 0, rawMatch.away_score || 0, rawMatch.status_detail);

  return {
    id: rawMatch.id,
    sport,
    status,
    isFeatured: Boolean(rawMatch.is_featured),
    competition: {
      id: rawMatch.tournaments?.id || 'comp-default',
      name: rawMatch.tournaments?.name || 'Championship Match',
      edition: rawMatch.tournaments?.edition || undefined,
      logoUrl: rawMatch.tournaments?.logo_url || undefined,
    },
    scheduledAt: rawMatch.scheduled_at || new Date().toISOString(),
    startedAt: rawMatch.started_at || undefined,
    endedAt: rawMatch.ended_at || undefined,
    venue: {
      name: rawMatch.venue || 'Sports Ground',
    },
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    statusDetail: rawMatch.status_detail || undefined,
    events: [],
    broadcast: rawMatch.vod_url
      ? { isLive: status === 'live', streamUrl: rawMatch.vod_url }
      : undefined,
  };
}
