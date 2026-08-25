'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';

export default function SportsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans">
      <SportsHeader />

      <main className="max-w-xl mx-auto px-4 py-16 text-center space-y-4 my-auto">
        <div className="w-16 h-16 rounded-full bg-[#EF233C]/10 text-[#EF233C] flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h1 className="font-display font-extrabold text-2xl text-[#111827]">
          Unable to Load Sports Content
        </h1>
        <p className="text-sm text-[#64748B]">
          We encountered an issue retrieving sports data. Please try again.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-[#0757E8] text-white font-bold text-sm hover:bg-[#004ED0] transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
          <Link
            href="/sports"
            className="px-6 py-2.5 rounded-xl border border-[#E5EAF2] text-[#111827] font-bold text-sm hover:bg-[#F1F4F8]"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
