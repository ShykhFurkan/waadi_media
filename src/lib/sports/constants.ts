export const SPORTS_DEMO_MODE = process.env.NEXT_PUBLIC_SPORTS_DEMO_MODE === 'true';

export const SPORT_CATEGORIES = [
  { id: 'all', name: 'All Matches' },
  { id: 'premier-league', name: 'Premier League' },
  { id: 'cup-championship', name: 'Cup Championship' },
  { id: 'womens-league', name: "Women's League" },
  { id: 'youth-league', name: 'Youth League' },
] as const;

export const SECONDARY_NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/sports' },
  { id: 'live', label: 'Live Scores', href: '/sports/live' },
  { id: 'matches', label: 'Matches', href: '/sports/matches' },
  { id: 'tournaments', label: 'Tournaments', href: '/sports/tournaments' },
  { id: 'leagues', label: 'Leagues', href: '/sports/leagues' },
  { id: 'news', label: 'News', href: '/sports/news' },
  { id: 'stories', label: 'Stories', href: '/sports/stories' },
  { id: 'teams', label: 'Teams', href: '/sports/teams' },
] as const;

export const DEFAULT_SPORTS_SEO = {
  title: 'Football Pulse | Live Football Scores, News, Tournaments & Live Streams',
  description: 'Your premier mobile-first football platform for real-time live scores, match commentary, tournament brackets, statistics, editorial stories, and high-definition live streams.',
  siteName: 'Waadi Football Pulse',
};
