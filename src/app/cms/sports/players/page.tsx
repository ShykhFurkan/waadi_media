'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Users, Shield } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getPlayers } from '@/lib/sports/repositories/players';
import { SportPlayer } from '@/lib/sports/types';

export default function CMSPlayersPage() {
  const [players, setPlayers] = useState<SportPlayer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const pList = await getPlayers();
    setPlayers(pList);
    setLoading(false);
  }

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.teamName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#111827]">PLAYERS MANAGEMENT</h2>
              <p className="text-xs text-[#64748B] font-medium">
                Player directory, team associations, goals tally, and individual performance metrics.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white border border-[#E5EAF2] rounded-xl px-3.5 py-2 shadow-xs">
            <Search size={16} className="text-[#64748B]" />
            <input
              type="text"
              placeholder="Search players by name or team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs font-medium text-[#111827] outline-hidden"
            />
          </div>

          {/* Players Table */}
          <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-xs overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F1F4F8] border-b border-[#E5EAF2] font-mono text-xs uppercase text-[#64748B]">
                <tr>
                  <th className="p-4">Rank / Player</th>
                  <th className="p-4">Football Team</th>
                  <th className="p-4">Position</th>
                  <th className="p-4 text-right">Goals Scored</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2]">
                {filteredPlayers.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="p-4 font-bold text-[#111827]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#64748B]">#{p.rank}</span>
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-mono text-[#64748B]">
                      {p.teamName}
                    </td>
                    <td className="p-4 text-xs font-mono text-[#0757E8]">
                      {p.position || 'Forward'}
                    </td>
                    <td className="p-4 text-right font-mono font-extrabold text-[#0757E8] text-base">
                      {p.goals || 0}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/cms/sports/players/${p.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-[#F1F4F8] text-[#111827] font-display font-bold text-xs hover:bg-[#E5EAF2] transition-colors"
                      >
                        Profile & Stats
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </CMSPinGuard>
  );
}
