import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { LiveMatchesSection } from '@/components/sports/matches/LiveMatchesSection';
import { getLiveMatches } from '@/lib/sports/repositories/matches';

export const metadata: Metadata = {
  title: 'Live Scores | Waadi Sports Pulse',
  description: 'Real-time live scores, match commentary, and sports updates.',
};

export default async function LiveScoresPage() {
  const liveMatches = await getLiveMatches();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-7xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <LiveMatchesSection matches={liveMatches} />
      </main>

      <BottomNavigation />
    </div>
  );
}
