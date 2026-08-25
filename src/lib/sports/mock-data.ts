import { SportMatch, SportStory, SportTournament, SportPlayer, SportNews, SportVideo, SportLeague, SportTeam } from './types';

export const MOCK_LIVE_HERO_MATCH: SportMatch = {
  id: 'match-live-hero-1',
  sport: 'football',
  status: 'live',
  isFeatured: true,
  competition: {
    id: 'ufl-2026',
    name: 'UFL Premier League 2026',
    edition: 'Semi Final 2',
  },
  scheduledAt: '2026-08-25T18:00:00Z',
  startedAt: new Date(Date.now() - (72 * 60 + 45) * 1000).toISOString(),
  venue: {
    name: 'National Sports Arena',
    city: 'Kehribal',
  },
  homeTeam: {
    id: 'kehribal-fc',
    name: 'KEHRIBAL FC',
    shortName: 'KFC',
    logoUrl: '/icons/football-shield-blue.png',
  },
  awayTeam: {
    id: 'akura-fc',
    name: 'AKURA FC',
    shortName: 'AFC',
    logoUrl: '/icons/football-shield-stripes.png',
  },
  homeScore: { sport: 'football', goals: 2 },
  awayScore: { sport: 'football', goals: 1 },
  period: 'second_half',
  statusDetail: '2nd Half',
  events: [
    {
      id: 'event-1',
      type: 'goal',
      timestamp: '2026-08-25T18:24:00Z',
      matchMinute: 24,
      playerName: 'Sameer',
      teamId: 'kehribal-fc',
      description: "Goal scored by Sameer 24'",
    },
    {
      id: 'event-2',
      type: 'goal',
      timestamp: '2026-08-25T18:45:00Z',
      matchMinute: 45,
      playerName: 'Irfan',
      teamId: 'akura-fc',
      description: "Goal scored by Irfan 45+2'",
    },
    {
      id: 'event-3',
      type: 'goal',
      timestamp: '2026-08-25T19:23:00Z',
      matchMinute: 68,
      playerName: 'Asif',
      teamId: 'kehribal-fc',
      description: "Goal scored by Asif 68'",
    },
  ],
  broadcast: {
    isLive: true,
    streamUrl: 'https://example.com/stream/live1',
  },
};

export const MOCK_LIVE_MATCHES: SportMatch[] = [
  MOCK_LIVE_HERO_MATCH,
  {
    id: 'match-live-football-2',
    sport: 'football',
    status: 'live',
    competition: {
      id: 'ufl-cup-2026',
      name: 'UFL Cup 2026 – Quarter Final',
    },
    scheduledAt: '2026-08-25T14:00:00Z',
    startedAt: '2026-08-25T14:00:00Z',
    venue: { name: 'Bakshi Stadium', city: 'Srinagar' },
    homeTeam: {
      id: 'srinagar-strikers-fc',
      name: 'Srinagar Strikers FC',
      shortName: 'SSF',
    },
    awayTeam: {
      id: 'badamwari-blasters-fc',
      name: 'Badamwari Blasters FC',
      shortName: 'BBF',
    },
    homeScore: { sport: 'football', goals: 2 },
    awayScore: { sport: 'football', goals: 0 },
    period: 'second_half',
    statusDetail: '84:12 2nd Half',
    events: [],
  },
  {
    id: 'match-live-football-3',
    sport: 'football',
    status: 'live',
    competition: {
      id: 'rfl-2026',
      name: 'Regional Football League – Match 12',
    },
    scheduledAt: '2026-08-25T17:30:00Z',
    startedAt: '2026-08-25T17:30:00Z',
    venue: { name: 'Polo Ground', city: 'Srinagar' },
    homeTeam: {
      id: 'kashmir-panthers-fc',
      name: 'Kashmir Panthers FC',
      shortName: 'KPF',
    },
    awayTeam: {
      id: 'leh-lakers-fc',
      name: 'Leh Lakers FC',
      shortName: 'LLF',
    },
    homeScore: { sport: 'football', goals: 3 },
    awayScore: { sport: 'football', goals: 3 },
    period: 'second_half',
    statusDetail: '62:40 2nd Half',
    events: [],
  },
  {
    id: 'match-live-football-4',
    sport: 'football',
    status: 'live',
    competition: {
      id: 'jkf-2026',
      name: 'JK Football Championship – Match 9',
    },
    scheduledAt: '2026-08-25T18:00:00Z',
    startedAt: '2026-08-25T18:00:00Z',
    venue: { name: 'Kehribal Sports Ground', city: 'Pampore' },
    homeTeam: {
      id: 'pampore-warriors-fc',
      name: 'Pampore Warriors FC',
      shortName: 'PWF',
    },
    awayTeam: {
      id: 'sopore-saints-fc',
      name: 'Sopore Saints FC',
      shortName: 'SSF',
    },
    homeScore: { sport: 'football', goals: 1 },
    awayScore: { sport: 'football', goals: 0 },
    period: 'first_half',
    statusDetail: 'HT',
    events: [],
  },
];

export const MOCK_TEAMS: SportTeam[] = [
  { id: 'kehribal-fc', name: 'Kehribal FC', shortName: 'KFC', logoUrl: '/icons/football-shield-blue.png' },
  { id: 'akura-fc', name: 'Akura FC', shortName: 'AFC', logoUrl: '/icons/football-shield-stripes.png' },
  { id: 'srinagar-strikers-fc', name: 'Srinagar Strikers FC', shortName: 'SSF' },
  { id: 'badamwari-blasters-fc', name: 'Badamwari Blasters FC', shortName: 'BBF' },
  { id: 'kashmir-panthers-fc', name: 'Kashmir Panthers FC', shortName: 'KPF' },
];

export const MOCK_UPCOMING_MATCHES: SportMatch[] = [
  {
    id: 'match-upcoming-1',
    sport: 'football',
    status: 'scheduled',
    competition: {
      id: 'ufl-2026',
      name: 'UFL Premier League 2026 – Final',
    },
    scheduledAt: '2026-08-27T14:00:00Z',
    venue: { name: 'Kehribal Stadium', city: 'Kehribal' },
    homeTeam: {
      id: 'kehribal-fc',
      name: 'KEHRIBAL FC',
      shortName: 'KFC',
    },
    awayTeam: {
      id: 'winner-sf2',
      name: 'WINNER SF 2',
      shortName: 'WSF',
    },
    homeScore: { sport: 'football', goals: 0 },
    awayScore: { sport: 'football', goals: 0 },
    events: [],
  },
  {
    id: 'match-upcoming-2',
    sport: 'football',
    status: 'scheduled',
    competition: {
      id: 'ufl-cup-2026',
      name: 'UFL Cup 2026 – Semi Final',
    },
    scheduledAt: '2026-08-26T09:30:00Z',
    venue: { name: 'Bakshi Stadium', city: 'Srinagar' },
    homeTeam: {
      id: 'downtown-warriors-fc',
      name: 'Downtown Warriors FC',
      shortName: 'DWF',
    },
    awayTeam: {
      id: 'ganderbal-giants-fc',
      name: 'Ganderbal Giants FC',
      shortName: 'GGF',
    },
    homeScore: { sport: 'football', goals: 0 },
    awayScore: { sport: 'football', goals: 0 },
    events: [],
  },
  {
    id: 'match-upcoming-3',
    sport: 'football',
    status: 'scheduled',
    competition: {
      id: 'youth-league-2026',
      name: 'Youth Football League – Match 13',
    },
    scheduledAt: '2026-08-26T12:30:00Z',
    venue: { name: 'Anantnag Sports Ground', city: 'Anantnag' },
    homeTeam: {
      id: 'budgam-bulls-fc',
      name: 'Budgam Bulls FC',
      shortName: 'BBF',
    },
    awayTeam: {
      id: 'anantnag-eagles-fc',
      name: 'Anantnag Eagles FC',
      shortName: 'AEF',
    },
    homeScore: { sport: 'football', goals: 0 },
    awayScore: { sport: 'football', goals: 0 },
    events: [],
  },
  {
    id: 'match-upcoming-4',
    sport: 'football',
    status: 'scheduled',
    competition: {
      id: 'uflw-2026',
      name: "UFL Women's League 2026 – Match 8",
    },
    scheduledAt: '2026-08-27T10:30:00Z',
    venue: { name: 'Polo Ground', city: 'Srinagar' },
    homeTeam: {
      id: 'kashmir-queens-fc',
      name: 'Kashmir Queens FC',
      shortName: 'KQF',
    },
    awayTeam: {
      id: 'pir-panjal-fc',
      name: 'Pir Panjal FC',
      shortName: 'PPF',
    },
    homeScore: { sport: 'football', goals: 0 },
    awayScore: { sport: 'football', goals: 0 },
    events: [],
  },
];

export const MOCK_STORIES: SportStory[] = [
  {
    id: 'story-1',
    title: 'Kehribal FC into the Final!',
    slug: 'kehribal-fc-into-the-final',
    category: 'UFL PREMIER LEAGUE',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    excerpt: 'What a performance by the boys! Dominant 2-1 display in the semi-final thriller.',
    publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    readTime: '4 min read',
    featured: true,
  },
  {
    id: 'story-2',
    title: 'Asif: The Goal Machine of UFL Premier League 2026',
    slug: 'asif-the-goal-machine-ufl-2026',
    category: 'PLAYER FEATURE',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    excerpt: '12 goals in 9 matches. An in-depth breakdown of Asif’s phenomenal season tactics.',
    publishedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 'story-3',
    title: 'Strikers FC Clinch Thrilling Win in Extra Time',
    slug: 'strikers-fc-clinch-thrilling-win-extra-time',
    category: 'UFL CUP LEAGUE',
    imageUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Scored in the 94th minute! Absolute masterclass finish in the final moments.',
    publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    readTime: '3 min read',
  },
];

export const MOCK_TOURNAMENTS: SportTournament[] = [
  {
    id: 'ufl-premier',
    name: 'UFL Premier League 2026',
    slug: 'ufl-premier-league-2026',
    sport: 'football',
    season: '2026',
    description: 'Premier Football League of Jammu & Kashmir',
    sortOrder: 1,
  },
  {
    id: 'ufl-cup',
    name: 'UFL Cup Championship 2026',
    slug: 'ufl-cup-championship-2026',
    sport: 'football',
    season: '2026',
    description: 'Knockout Football Tournament',
    sortOrder: 2,
  },
  {
    id: 'ufl-women',
    name: "UFL Women's League 2026",
    slug: 'ufl-womens-league-2026',
    sport: 'football',
    season: '2026',
    description: "Women's Premier Football League",
    sortOrder: 3,
  },
  {
    id: 'jk-football',
    name: 'JK Football Championship',
    slug: 'jk-football-championship',
    sport: 'football',
    season: '2026',
    description: 'State Football Championship Trophy',
    sortOrder: 4,
  },
  {
    id: 'youth-league',
    name: 'Youth Football League 2026',
    slug: 'youth-football-league-2026',
    sport: 'football',
    season: '2026',
    description: 'Under-21 Football Development Tournament',
    sortOrder: 5,
  },
];

export const MOCK_TOP_SCORERS: SportPlayer[] = [
  { id: 'player-1', rank: 1, name: 'Asif', teamName: 'Kehribal FC', goals: 12 },
  { id: 'player-2', rank: 2, name: 'Irfan', teamName: 'Akura FC', goals: 9 },
  { id: 'player-3', rank: 3, name: 'Sameer', teamName: 'Kehribal FC', goals: 8 },
  { id: 'player-4', rank: 4, name: 'Junaid', teamName: 'Downtown Warriors FC', goals: 7 },
  { id: 'player-5', rank: 5, name: 'Athar', teamName: 'Kehribal FC', goals: 6 },
];

export const MOCK_NEWS: SportNews[] = [
  {
    id: 'news-1',
    title: 'UFL Premier League 2026: Semi Final 2 – Preview & Key Players',
    slug: 'ufl-premier-league-2026-semi-final-2-preview',
    category: 'PREMIER LEAGUE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=300&q=80',
    publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    summary: 'Full preview of tonight’s clash between Kehribal FC and Akura FC.',
  },
  {
    id: 'news-2',
    title: 'Kehribal FC reach another final with a dominant 2-1 win!',
    slug: 'kehribal-fc-reach-another-final',
    category: 'UFL PREMIER',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=300&q=80',
    publishedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    summary: 'Detailed match recap from the National Sports Arena.',
  },
  {
    id: 'news-3',
    title: 'UFL Cup: Srinagar Strikers FC book spot in Semi Final',
    slug: 'ufl-cup-strikers-fc-book-spot',
    category: 'UFL CUP',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80',
    publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    summary: 'Standings update following Strikers FC dramatic victory.',
  },
];

export const MOCK_FEATURED_VIDEOS: SportVideo[] = [
  {
    id: 'video-1',
    title: 'Top 10 Goals of UFL Premier League 2026',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    duration: '04:35',
    views: '2.1K views',
    publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    videoUrl: 'https://example.com/video1.mp4',
  },
];

export const MOCK_LEAGUES: SportLeague[] = [
  {
    id: 'ufl-premier-league',
    name: 'UFL Premier League 2026',
    slug: 'ufl-premier-league-2026',
    sport: 'football',
    standings: [
      { pos: 1, team: { id: 'kehribal-fc', name: 'Kehribal FC', shortName: 'KFC' }, played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 24, goalsAgainst: 8, goalDifference: 16, points: 25 },
      { pos: 2, team: { id: 'akura-fc', name: 'Akura FC', shortName: 'AFC' }, played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 18, goalsAgainst: 11, goalDifference: 7, points: 20 },
      { pos: 3, team: { id: 'downtown-warriors-fc', name: 'Downtown Warriors FC', shortName: 'DWF' }, played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 15, goalsAgainst: 12, goalDifference: 3, points: 18 },
      { pos: 4, team: { id: 'sopore-saints-fc', name: 'Sopore Saints FC', shortName: 'SSF' }, played: 10, won: 3, drawn: 2, lost: 5, goalsFor: 11, goalsAgainst: 16, goalDifference: -5, points: 11 },
    ],
  },
];
