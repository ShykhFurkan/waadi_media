import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { FeaturedVideo } from '@/components/sports/media/FeaturedVideo';
import { getFeaturedVideos } from '@/lib/sports/repositories/videos';

export const metadata: Metadata = {
  title: 'Sports Videos & Highlights | Waadi Sports Pulse',
  description: 'Watch top goal highlights, match summaries, and exclusive sports video content.',
};

export default async function VideosPage() {
  const videos = await getFeaturedVideos();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-4xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <FeaturedVideo videos={videos} />
      </main>

      <BottomNavigation />
    </div>
  );
}
