import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { getLeagues } from '@/lib/sports/repositories/leagues';

export const metadata: Metadata = {
  title: 'Leagues & Standings | Waadi Sports Pulse',
  description: 'Official league tables, points tally, goals, and team positions.',
};

export default async function LeaguesPage() {
  const leagues = await getLeagues();
  const primaryLeague = leagues[0];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-4xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <div className="space-y-4">
          <h1 className="font-display font-extrabold text-2xl text-[#111827]">
            League Standings
          </h1>

          {primaryLeague && (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 sm:p-6 shadow-sm space-y-4">
              <h2 className="font-display font-bold text-lg text-[#111827]">
                {primaryLeague.name}
              </h2>

              {/* Horizontally Scrollable Standings Table */}
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-xs text-left min-w-[500px]">
                  <thead>
                    <tr className="border-b border-[#E5EAF2] font-mono text-[#94A3B8] font-bold pb-2">
                      <th className="py-2 px-2">POS</th>
                      <th className="py-2 px-2">TEAM</th>
                      <th className="py-2 px-2 text-center">P</th>
                      <th className="py-2 px-2 text-center">W</th>
                      <th className="py-2 px-2 text-center">D</th>
                      <th className="py-2 px-2 text-center">L</th>
                      <th className="py-2 px-2 text-center">GF</th>
                      <th className="py-2 px-2 text-center">GA</th>
                      <th className="py-2 px-2 text-center">GD</th>
                      <th className="py-2 px-2 text-right font-bold text-[#0757E8]">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EAF2]">
                    {primaryLeague.standings?.map((row) => (
                      <tr key={row.pos} className="hover:bg-[#F7F9FC]">
                        <td className="py-3 px-2 font-mono font-bold text-[#64748B]">{row.pos}</td>
                        <td className="py-3 px-2 font-bold text-[#111827]">{row.team.name}</td>
                        <td className="py-3 px-2 text-center font-mono">{row.played}</td>
                        <td className="py-3 px-2 text-center font-mono text-[#16A34A]">{row.won}</td>
                        <td className="py-3 px-2 text-center font-mono">{row.drawn}</td>
                        <td className="py-3 px-2 text-center font-mono text-[#EF233C]">{row.lost}</td>
                        <td className="py-3 px-2 text-center font-mono">{row.goalsFor}</td>
                        <td className="py-3 px-2 text-center font-mono">{row.goalsAgainst}</td>
                        <td className="py-3 px-2 text-center font-mono">{row.goalDifference}</td>
                        <td className="py-3 px-2 text-right font-mono font-extrabold text-[#0757E8]">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
