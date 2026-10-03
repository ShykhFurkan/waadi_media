'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPostMetadata } from '@/lib/mdx';
import { cn } from '@/lib/utils';
import { Clock, Calendar } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Websites',
  'SEO',
  'Branding',
  'Advertising',
  'Business',
];

export function BlogListClient({
  posts,
}: {
  posts: BlogPostMetadata[];
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return posts;
    return posts.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [posts, selectedCategory]);

  if (posts.length === 0) {
    return (
      <div className="p-12 sm:p-16 bg-paper border border-line rounded-3xl text-center space-y-4 max-w-xl mx-auto shadow-floating">
        <h2 className="text-h2 text-ink">New articles are on the way.</h2>
        <p className="text-lead text-mist">
          We&apos;re currently preparing practical, plain-language guides on websites, search, and marketing for Kashmir&apos;s businesses. Check back soon.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue text-white text-sm font-medium hover:bg-blue-deep transition-colors"
          >
            Have a question? Ask us
          </Link>
        </div>
      </div>
    );
  }

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-12">
      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 pt-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer',
                isSelected
                  ? 'bg-blue text-white border-blue'
                  : 'bg-paper text-graphite border-line hover:border-mist'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Featured Latest Post */}
      {featuredPost && (
        <article className="group p-8 sm:p-12 bg-paper border border-line rounded-3xl hover:border-blue transition-colors shadow-floating relative">
          <div className="flex flex-wrap items-center gap-4 text-xs text-mist mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-tint text-blue font-medium">
              {featuredPost.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {featuredPost.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {featuredPost.readingTime}
            </span>
            {featuredPost.draft && (
              <span className="px-2.5 py-0.5 rounded-full bg-error/10 text-error font-medium">
                Draft for review
              </span>
            )}
          </div>

          <h2 className="text-h2 text-ink group-hover:text-blue transition-colors mb-4">
            <Link href={`/blog/${featuredPost.slug}`}>
              {featuredPost.title}
            </Link>
          </h2>

          <p className="text-lead text-graphite mb-6 max-w-3xl">
            {featuredPost.description}
          </p>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue group-hover:text-blue-deep transition-colors"
          >
            Read article
          </Link>
        </article>
      )}

      {/* Grid of Remaining Posts */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {gridPosts.map((post) => (
            <article
              key={post.slug}
              className="group p-6 sm:p-8 bg-paper border border-line rounded-2xl hover:border-blue transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-mist mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-snow border border-line text-graphite font-medium">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span>{post.readingTime}</span>
                  {post.draft && (
                    <span className="text-error font-medium text-[11px]">
                      (Draft)
                    </span>
                  )}
                </div>

                <h3 className="text-h3 text-ink group-hover:text-blue transition-colors mb-2.5">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-sm text-graphite line-clamp-3 mb-6">
                  {post.description}
                </p>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-blue group-hover:text-blue-deep transition-colors"
              >
                Read article
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
