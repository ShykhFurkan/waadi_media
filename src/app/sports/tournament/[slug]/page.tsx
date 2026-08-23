'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { supabase, Tournament, Match } from '@/lib/supabase';
import { Header } from '@/components/sports/Header';
import { MatchCard } from '@/components/sports/MatchCard';
import { RidgeLine } from '@/components/sports/RidgeLine';

export default function TournamentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournamentDetails();
  }, [slug]);

  async function fetchTournamentDetails() {
    setLoading(true);
    const { data: tData } = await supabase
      .from('tournaments')
      .select('*, sports(*)')
      .eq('slug', slug)
      .single();

    if (tData) {
      setTournament(tData);
      const { data: mData } = await supabase
        .from('matches')
        .select('*, tournaments(*, sports(*)), home_team:home_team_id(*), away_team:away_team_id(*)')
        .eq('tournament_id', tData.id);

      if (mData) setMatches(mData);
    }
    setLoading(false);
  }

  if (loading || !tournament) {
    return (
      <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0]">
        <Header />
        <RidgeLine variant="loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2 border-b border-[#22302B] pb-6">
          <span className="text-xs font-mono text-[#E8A33D]">{tournament.season} SEASON</span>
          <h1 className="font-display text-4xl text-[#F7F5F0]">{tournament.name}</h1>
          <p className="text-sm text-[#8A9A91] max-w-2xl">{tournament.description}</p>
        </div>

        <section className="space-y-4">
          <h2 className="font-display text-xl text-[#F7F5F0]">TOURNAMENT FIXTURES & RESULTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
