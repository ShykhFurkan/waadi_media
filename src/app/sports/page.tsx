import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { AdBanner } from '@/components/sports/ads/AdBanner';
import { PublicSportsFeed } from '@/components/sports/PublicSportsFeed';

import { getLiveMatches, getUpcomingMatches, getPreviousMatches } from '@/lib/sports/repositories/matches';
import { getTopStories } from '@/lib/sports/repositories/stories';
import { getTournaments } from '@/lib/sports/repositories/tournaments';
import { getTopScorers } from '@/lib/sports/repositories/players';
import { getNewsUpdates } from '@/lib/sports/repositories/news';
import { DEFAULT_SPORTS_SEO } from '@/lib/sports/constants';

export const metadata: Metadata = {
  title: 'Waadi Sports Pulse | Kashmir Football & Local Tournaments Live',
  description: DEFAULT_SPORTS_SEO.description,
  openGraph: {
    title: DEFAULT_SPORTS_SEO.title,
    description: DEFAULT_SPORTS_SEO.description,
    type: 'website',
  },
};

export default async function SportsPage() {
  const [
    liveMatches,
    upcomingMatches,
    previousMatches,
    stories,
    tournaments,
    topScorers,
    news,
  ] = await Promise.all([
    getLiveMatches(),
    getUpcomingMatches(),
    getPreviousMatches(),
    getTopStories(),
    getTournaments(),
    getTopScorers(),
    getNewsUpdates(),
  ]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8 selection:bg-[#0757E8] selection:text-white">
      {/* 1. EXISTING NAVBAR */}
      <SportsHeader />
      <SecondaryNav />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 w-full pt-4 space-y-6 flex-1">
        {/* 2. EXISTING ADVERTISEMENT */}
        <AdBanner slot="sports-home-top" format="leaderboard" />

        {/* 3 to 13. REDESIGNED PUBLIC SPORTS FEED */}
        <PublicSportsFeed
          liveMatches={liveMatches}
          upcomingMatches={upcomingMatches}
          previousMatches={previousMatches}
          tournaments={tournaments}
          topScorers={topScorers}
          stories={stories}
          news={news}
        />
      </main>

      {/* 14. MOBILE BOTTOM NAVIGATION & FOOTER */}
      <BottomNavigation />
    </div>
  );
}
