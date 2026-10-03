import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found - Waadi Media',
    };
  }

  return {
    title: `${post.metadata.title} - Waadi Media`,
    description: post.metadata.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-3xl mx-auto">
      <Link href="/blog" className="text-sm text-blue hover:text-blue-deep mb-8 inline-block">
        ← Back to all notes
      </Link>

      <div className="flex items-center gap-3 text-xs text-mist mb-3">
        <span className="px-2.5 py-0.5 bg-blue-tint text-blue rounded-md font-medium">
          {post.metadata.category}
        </span>
        <span>{post.metadata.date}</span>
        <span>•</span>
        <span>{post.metadata.readingTime}</span>
        {post.metadata.draft && (
          <span className="text-error font-medium">(Draft for review)</span>
        )}
      </div>

      <h1 className="text-h1 text-ink mb-6">{post.metadata.title}</h1>
      <p className="text-lead text-mist mb-8">{post.metadata.description}</p>

      <div className="prose prose-lg max-w-none text-graphite leading-relaxed border-t border-line pt-8 space-y-6">
        <div className="whitespace-pre-wrap font-sans text-body">
          {post.content}
        </div>
      </div>

      <div className="mt-12 p-8 bg-paper border border-line rounded-3xl text-center">
        <h3 className="text-h3 text-ink mb-2">Want help with this?</h3>
        <p className="text-mist mb-6">Talk directly with our team in Anantnag. First call is free.</p>
        <Link
          href="/book-a-call"
          className="inline-block px-7 py-3.5 bg-blue text-white rounded-full font-medium shadow-floating hover:bg-blue-deep transition-colors"
        >
          Book a free call
        </Link>
      </div>
    </div>
  );
}
