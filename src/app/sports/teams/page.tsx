import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { getTeams } from '@/lib/sports/repositories/teams';

export const metadata: Metadata = {
  title: 'Sports Teams & Squads | Waadi Sports Pulse',
  description: 'Discover sports clubs, team profiles, and squad rosters.',
};

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-4xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <h1 className="font-display font-extrabold text-2xl text-[#111827]">
          Teams & Clubs
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div key={team.id} className="p-4 rounded-2xl bg-white border border-[#E5EAF2] text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#EAF2FF] text-[#0757E8] font-bold flex items-center justify-center">
                  {team.shortName}
                </div>
                <h4 className="font-bold text-sm text-[#111827]">{team.name}</h4>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 bg-white border border-[#E5EAF2] rounded-2xl text-center text-sm text-[#64748B]">
              No teams listed yet. Check back soon!
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
