import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Blog - Notes from the valley - Waadi Media',
  description:
    'Plain-language guides on websites, search, branding and growing a business in Kashmir.',
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-5xl mx-auto">
      <h1 className="text-h1 mb-4 text-ink">Notes from the valley</h1>
      <p className="text-lead text-mist mb-12">
        Plain-language guides on websites, search, branding and growing a business in Kashmir.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-6 bg-paper border border-line rounded-2xl hover:border-blue transition-colors"
          >
            <div className="flex items-center gap-3 text-xs text-mist mb-2">
              <span className="px-2.5 py-0.5 bg-blue-tint text-blue rounded-md font-medium">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
              {post.draft && (
                <span className="text-error font-medium">(Draft for review)</span>
              )}
            </div>
            <h2 className="text-h3 text-ink mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue">
                {post.title}
              </Link>
            </h2>
            <p className="text-body text-graphite mb-4">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium text-blue hover:text-blue-deep"
            >
              Read article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
