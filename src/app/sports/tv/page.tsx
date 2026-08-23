'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, Match } from '@/lib/supabase';
import { Header } from '@/components/sports/Header';
import { LiveBadge } from '@/components/sports/LiveBadge';
import { MatchCard } from '@/components/sports/MatchCard';

export default function WaadiTVHubPage() {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [completedMatches, setCompletedMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchTVMatches();
  }, []);

  async function fetchTVMatches() {
    const { data } = await supabase
      .from('matches')
      .select('*, tournaments(*, sports(*)), home_team:home_team_id(*), away_team:away_team_id(*)');

    if (data) {
      setLiveMatches(data.filter((m) => m.status === 'live'));
      setUpcomingMatches(data.filter((m) => m.status === 'upcoming'));
      setCompletedMatches(data.filter((m) => m.status === 'completed'));
    }
  }

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#22302B] pb-4">
          <div>
            <h1 className="font-display text-3xl text-[#F7F5F0]">WAADI TV</h1>
            <p className="text-xs font-mono text-[#8A9A91] mt-1">
              Live Sports Video Stream Layer · Simulcast to YouTube & Facebook
            </p>
          </div>
          {liveMatches.length > 0 && <LiveBadge size="lg" />}
        </div>

        {/* Live Broadcast Section */}
        <section className="space-y-4">
          <h2 className="font-display text-xl text-[#F7F5F0] flex items-center gap-2">
            <span>LIVE BROADCASTS</span>
          </h2>
          {liveMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveMatches.map((match) => (
                <div
                  key={match.id}
                  className="rounded-xl border border-[#22302B] bg-[#1B4332] p-6 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#8A9A91]">{match.tournaments?.name}</span>
                    <LiveBadge size="sm" />
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="text-center font-display text-[#F7F5F0]">
                      <div className="text-lg">{match.home_team?.name}</div>
                      <div className="text-3xl text-[#E8A33D]">{match.home_score}</div>
                    </div>
                    <div className="font-display text-sm text-[#8A9A91]">VS</div>
                    <div className="text-center font-display text-[#F7F5F0]">
                      <div className="text-lg">{match.away_team?.name}</div>
                      <div className="text-3xl text-[#E8A33D]">{match.away_score}</div>
                    </div>
                  </div>

                  <Link
                    href={`/sports/tv/${match.id}`}
                    className="block w-full py-3 text-center font-display text-sm bg-[#E8A33D] text-[#0F2A1E] rounded-lg hover:bg-[#F2C878] transition-colors"
                  >
                    Enter Live Broadcast Stream →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-lg border border-[#22302B] bg-[#1B4332]/40 text-center text-sm text-[#8A9A91]">
              No active live stream right now. Check upcoming broadcasts below.
            </div>
          )}
        </section>

        {/* Upcoming Broadcast Schedule */}
        <section className="space-y-4">
          <h2 className="font-display text-xl text-[#F7F5F0]">UPCOMING STREAM SCHEDULE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>

        {/* Recent VODs */}
        <section className="space-y-4">
          <h2 className="font-display text-xl text-[#F7F5F0]">RECENT FULL MATCH VODS & HIGHLIGHTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
