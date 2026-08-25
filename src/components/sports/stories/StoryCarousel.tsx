import React from 'react';
import Link from 'next/link';
import { SportStory } from '@/lib/sports/types';
import { StoryCard } from './StoryCard';

interface StoryCarouselProps {
  stories: SportStory[];
}

export const StoryCarousel: React.FC<StoryCarouselProps> = ({ stories }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827]">
          Top Stories
        </h2>
        <Link
          href="/sports/stories"
          className="text-xs font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Desktop Grid / Mobile Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
};
