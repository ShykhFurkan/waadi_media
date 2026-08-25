import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { LiveMatchesSection } from '@/components/sports/matches/LiveMatchesSection';
import { UpcomingMatchCard } from '@/components/sports/matches/UpcomingMatchCard';
import { getLiveMatches, getUpcomingMatches } from '@/lib/sports/repositories/matches';

export const metadata: Metadata = {
  title: 'Matches & Fixtures | Waadi Sports Pulse',
  description: 'Full sports match schedule, live scores, and upcoming fixtures.',
};

export default async function MatchesPage() {
  const [liveMatches, upcomingMatches] = await Promise.all([
    getLiveMatches(),
    getUpcomingMatches(),
  ]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-7xl mx-auto px-4 w-full pt-6 space-y-8 flex-1">
        <LiveMatchesSection matches={liveMatches} />

        <section className="space-y-4">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827]">
            Upcoming Fixtures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMatches.map((match) => (
              <UpcomingMatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
