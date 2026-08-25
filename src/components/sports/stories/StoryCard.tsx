import React from 'react';
import Link from 'next/link';
import { SportStory } from '@/lib/sports/types';

interface StoryCardProps {
  story: SportStory;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <Link
      href={`/sports/stories/${story.slug}`}
      className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-[#05070B] shadow-md border border-[#E5EAF2] flex flex-col justify-end p-4 sm:p-5 transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Background Image */}
      <img
        src={story.imageUrl}
        alt={story.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-transparent" />

      {/* Card Content */}
      <div className="relative z-10 space-y-2">
        <span className="inline-block px-2.5 py-1 rounded-md bg-[#0757E8] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
          {story.category}
        </span>

        <h3 className="font-display font-bold text-sm sm:text-base text-white leading-snug line-clamp-2 group-hover:text-[#1769FF] transition-colors">
          {story.title}
        </h3>

        <p className="text-xs text-white/70 line-clamp-1">
          {story.excerpt}
        </p>

        <div className="text-[11px] font-mono text-white/50 pt-1">
          {story.readTime}
        </div>
      </div>
    </Link>
  );
};
