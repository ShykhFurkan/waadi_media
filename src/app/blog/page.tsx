import React from 'react';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { BlogListClient } from '@/components/blog/BlogListClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog - Notes from the valley - Waadi Media',
  description:
    'Plain-language guides on websites, search, branding and growing a business in Kashmir.',
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': '/blog/feed.xml',
    },
  },
  openGraph: {
    title: 'Blog - Notes from the valley - Waadi Media',
    description:
      'Plain-language guides on websites, search, branding and growing a business in Kashmir.',
    url: '/blog',
  },
};

export default function BlogListPage() {
  const posts = getAllPosts();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <JsonLd data={breadcrumbsSchema} />

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <h1 className="text-h1 text-ink mb-4">
            Notes from the valley
          </h1>
          <p className="text-lead text-mist">
            Plain-language guides on websites, search, branding and growing a business in Kashmir.
          </p>
        </div>

        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
