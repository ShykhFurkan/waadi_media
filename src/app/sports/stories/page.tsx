import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { StoryCarousel } from '@/components/sports/stories/StoryCarousel';
import { getTopStories } from '@/lib/sports/repositories/stories';

export const metadata: Metadata = {
  title: 'Editorial Sports Stories | Waadi Sports Pulse',
  description: 'In-depth player features, tactical breakdowns, and tournament stories.',
};

export default async function StoriesPage() {
  const stories = await getTopStories();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-7xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <StoryCarousel stories={stories} />
      </main>

      <BottomNavigation />
    </div>
  );
}
