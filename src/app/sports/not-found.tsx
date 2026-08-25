import React from 'react';
import Link from 'next/link';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';

export default function SportsNotFound() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans">
      <SportsHeader />

      <main className="max-w-md mx-auto px-4 py-20 text-center space-y-4 my-auto">
        <h1 className="font-display font-black text-6xl text-[#0757E8]">404</h1>
        <h2 className="font-display font-extrabold text-xl text-[#111827]">
          Sports Resource Not Found
        </h2>
        <p className="text-sm text-[#64748B]">
          The requested match, tournament, or news story does not exist or has been removed.
        </p>

        <div className="pt-2">
          <Link
            href="/sports"
            className="inline-block px-6 py-3 rounded-xl bg-[#0757E8] text-white font-bold text-sm hover:bg-[#004ED0] transition-colors"
          >
            Back to Sports Pulse
          </Link>
        </div>
      </main>
    </div>
  );
}
