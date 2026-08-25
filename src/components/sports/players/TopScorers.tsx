import React from 'react';
import Link from 'next/link';
import { SportPlayer } from '@/lib/sports/types';

interface TopScorersProps {
  players: SportPlayer[];
}

export const TopScorers: React.FC<TopScorersProps> = ({ players }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
        <h3 className="font-display font-extrabold text-base text-[#111827]">Top Scorers</h3>
        <Link href="/sports/rankings" className="text-xs font-bold text-[#0757E8] hover:underline">
          View All
        </Link>
      </div>

      <div className="w-full text-xs">
        <div className="grid grid-cols-12 font-mono font-bold text-[#94A3B8] pb-2 border-b border-[#E5EAF2]">
          <span className="col-span-2">#</span>
          <span className="col-span-5">Player</span>
          <span className="col-span-3">Team</span>
          <span className="col-span-2 text-right">Goals</span>
        </div>

        <div className="divide-y divide-[#E5EAF2]">
          {players.map((player) => (
            <div key={player.id} className="grid grid-cols-12 items-center py-2.5 hover:bg-[#F7F9FC] transition-colors rounded-lg px-1">
              <span className="col-span-2 font-mono font-bold text-[#64748B]">{player.rank}</span>
              <div className="col-span-5 font-bold text-[#111827] flex items-center gap-2 truncate">
                <div className="w-6 h-6 rounded-full bg-[#EAF2FF] text-[#0757E8] font-bold flex items-center justify-center text-[10px] shrink-0">
                  {player.name.charAt(0)}
                </div>
                <span className="truncate">{player.name}</span>
              </div>
              <span className="col-span-3 text-[#64748B] truncate">{player.teamName}</span>
              <span className="col-span-2 font-mono font-bold text-right text-[#0757E8]">{player.goals}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
