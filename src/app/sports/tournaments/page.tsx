import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { TournamentsSection } from '@/components/sports/tournaments/TournamentsSection';
import { getTournaments } from '@/lib/sports/repositories/tournaments';

export const metadata: Metadata = {
  title: 'Tournaments & Leagues | Waadi Sports Pulse',
  description: 'Explore premier sports tournaments, leagues, brackets, and standings.',
};

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-7xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <TournamentsSection tournaments={tournaments} />
      </main>

      <BottomNavigation />
    </div>
  );
}
