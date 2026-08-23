'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { supabase, Match } from '@/lib/supabase';
import { Header } from '@/components/sports/Header';
import { MatchCard } from '@/components/sports/MatchCard';
import { RidgeLine } from '@/components/sports/RidgeLine';

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatch();
  }, [id]);

  async function fetchMatch() {
    setLoading(true);
    const { data } = await supabase
      .from('matches')
      .select('*, tournaments(*, sports(*)), home_team:home_team_id(*), away_team:away_team_id(*)')
      .eq('id', id)
      .single();

    if (data) setMatch(data);
    setLoading(false);
  }

  if (loading || !match) {
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

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#E8A33D]">MATCH OVERVIEW</span>
          <h1 className="font-display text-3xl text-[#F7F5F0]">
            {match.home_team?.name} vs {match.away_team?.name}
          </h1>
          <p className="text-xs text-[#8A9A91]">{match.venue} · {match.status_detail}</p>
        </div>

        <MatchCard match={match} />

        <div className="text-center pt-6">
          <Link
            href={`/sports/tv/${match.id}`}
            className="inline-flex px-6 py-3 rounded-lg bg-[#E8A33D] text-[#0F2A1E] font-display hover:bg-[#F2C878] transition-colors"
          >
            Go to Waadi TV Match Page →
          </Link>
        </div>
      </main>
    </div>
  );
}
