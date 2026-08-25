import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { getTournamentById } from '@/lib/sports/repositories/tournaments';

interface Props {
  params: Promise<{ tournamentId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tournament = await getTournamentById(resolvedParams.tournamentId);

  if (!tournament) {
    return { title: 'Tournament Not Found | Waadi Sports' };
  }

  return {
    title: `${tournament.name} Standings & Fixtures | Waadi Sports`,
    description: `Complete fixtures, results, and standings for ${tournament.name}.`,
  };
}

export default async function TournamentDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const tournament = await getTournamentById(resolvedParams.tournamentId);

  if (!tournament) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-4xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-2">
          <span className="text-xs font-mono font-bold text-[#0757E8] uppercase tracking-wider">
            {tournament.sport} TOURNAMENT
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111827]">
            {tournament.name}
          </h1>
          <p className="text-xs text-[#64748B]">{tournament.description || 'Season 2026'}</p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
