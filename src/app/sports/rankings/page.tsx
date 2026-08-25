import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { TopScorers } from '@/components/sports/players/TopScorers';
import { getTopScorers } from '@/lib/sports/repositories/players';

export const metadata: Metadata = {
  title: 'Rankings & Leaderboards | Waadi Sports Pulse',
  description: 'Top player rankings, goals leaderboards, and statistics.',
};

export default async function RankingsPage() {
  const scorers = await getTopScorers();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-4xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <TopScorers players={scorers} />
      </main>

      <BottomNavigation />
    </div>
  );
}
