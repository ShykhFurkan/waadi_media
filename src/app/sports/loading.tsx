import React from 'react';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';

export default function SportsLoading() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-7xl mx-auto px-4 w-full pt-4 space-y-6 flex-1">
        {/* Ad Skeleton */}
        <div className="w-full h-[90px] bg-[#E5EAF2] rounded-xl animate-pulse" />

        {/* Hero Skeleton */}
        <div className="w-full h-[360px] bg-[#071426] rounded-2xl animate-pulse" />

        {/* Matches Section Skeleton */}
        <div className="space-y-3">
          <div className="h-6 w-48 bg-[#E5EAF2] rounded animate-pulse" />
          <div className="h-28 w-full bg-white border border-[#E5EAF2] rounded-2xl animate-pulse" />
          <div className="h-28 w-full bg-white border border-[#E5EAF2] rounded-2xl animate-pulse" />
        </div>
      </main>
    </div>
  );
}
