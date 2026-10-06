import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/mdx';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, getFaqPageSchema } from '@/lib/seo';
import { ReadingProgressBar, ShareButtons } from '@/components/blog/BlogPostClientElements';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const isProduction = process.env.NODE_ENV === 'production';
  const posts = getAllPosts(!isProduction);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const isProduction = process.env.NODE_ENV === 'production';
  const post = getPostBySlug(slug, !isProduction);

  if (!post || (isProduction && post.metadata.draft)) {
    return {
      title: 'Article Not Found - Waadi Media',
    };
  }

  const postUrl = `${siteConfig.url}/blog/${post.metadata.slug}`;

  const pageTitle =
    post.metadata.metaTitle ||
    (post.metadata.title.length + 14 <= 60
      ? `${post.metadata.title} - Waadi Media`
      : post.metadata.title.length <= 60
      ? post.metadata.title
      : `${post.metadata.title.slice(0, 57)}...`);

  const coverUrl = post.metadata.cover
    ? (post.metadata.cover.startsWith('http') ? post.metadata.cover : `${siteConfig.url}${post.metadata.cover}`)
    : undefined;

  return {
    title: pageTitle,
    description: post.metadata.description,
    keywords: post.metadata.keywords || (post.metadata.keyword ? [post.metadata.keyword] : undefined),
    authors: [{ name: post.metadata.author }],
    alternates: {
      canonical: `/blog/${post.metadata.slug}`,
      languages: {
        'en-IN': `/blog/${post.metadata.slug}`,
      },
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      url: postUrl,
      type: 'article',
      siteName: siteConfig.name,
      locale: 'en_IN',
      publishedTime: post.metadata.date.includes('T') ? post.metadata.date : `${post.metadata.date}T09:00:00+05:30`,
      modifiedTime: (post.metadata.updated || post.metadata.date).includes('T')
        ? (post.metadata.updated || post.metadata.date)
        : `${post.metadata.updated || post.metadata.date}T09:00:00+05:30`,
      authors: [post.metadata.author],
      tags: [post.metadata.category, ...(post.metadata.keywords || [post.metadata.keyword])],
      images: coverUrl
        ? [
            {
              url: coverUrl,
              width: 1200,
              height: 630,
              alt: post.metadata.coverAlt || post.metadata.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.description,
      images: coverUrl ? [coverUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const Callout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="my-8 p-6 sm:p-7 bg-paper border-[3px] border-ink rounded-[20px] shadow-hard-sm">
      {title && (
        <div className="font-display font-black text-sm uppercase tracking-wider text-ink mb-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-saffron border border-ink" />
          <span>{title}</span>
        </div>
      )}
      <div className="text-[17px] sm:text-[18px] text-ink leading-relaxed [&>p:last-child]:mb-0 [&>ul:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
};

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = text
      ? text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      : undefined;
    return (
      <h2
        id={id}
        className="text-h2 text-ink mt-12 mb-4 scroll-mt-24 first:mt-6"
        {...props}
      />
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = text
      ? text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      : undefined;
    return (
      <h3
        id={id}
        className="text-h3 text-ink mt-8 mb-3 scroll-mt-24"
        {...props}
      />
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[17px] sm:text-[18px] text-ink mb-6 leading-relaxed font-sans" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 space-y-2 mb-6 text-[17px] sm:text-[18px] text-ink leading-relaxed" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 space-y-2 mb-6 text-[17px] sm:text-[18px] text-ink leading-relaxed" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed text-[17px] sm:text-[18px] text-ink" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href || '';
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    return (
      <a
        className="text-chinar hover:underline font-bold transition-colors"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-[6px] border-chinar pl-6 pr-4 py-4 italic text-ink my-8 bg-paper border-y-[2px] border-r-[2px] border-ink rounded-[16px] shadow-hard-sm font-serif text-[18px] leading-relaxed"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-ink" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 max-w-full border-[3px] border-ink rounded-[18px] bg-paper shadow-hard-sm">
      <table className="min-w-full text-left border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-paper-2 border-b-2 border-ink" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="p-3.5 sm:p-4 border-b-2 border-ink font-sans font-bold text-ink text-left text-sm" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="p-3.5 sm:p-4 border-b border-ink/20 text-ink leading-relaxed text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="overflow-x-auto my-6 max-w-full rounded-[16px] border-[2px] border-ink bg-paper-2 p-4 shadow-hard-sm">
      <pre className="text-sm font-mono overflow-x-auto" {...props} />
    </div>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono text-sm bg-paper-2 px-1.5 py-0.5 rounded border border-ink/30" {...props} />
  ),
  Button,
  Callout,
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const isProduction = process.env.NODE_ENV === 'production';
  const post = getPostBySlug(slug, !isProduction);

  if (!post || (isProduction && post.metadata.draft)) {
    notFound();
  }

  const postUrl = `${siteConfig.url}/blog/${post.metadata.slug}`;
  const relatedPosts = getRelatedPosts(slug, post.metadata.category, 2, post.metadata.relatedSlugs);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.description,
    image: post.metadata.cover
      ? (post.metadata.cover.startsWith('http') ? post.metadata.cover : `${siteConfig.url}${post.metadata.cover}`)
      : `${siteConfig.url}/blog/${post.metadata.slug}/opengraph-image`,
    datePublished: post.metadata.date.includes('T') ? post.metadata.date : `${post.metadata.date}T09:00:00+05:30`,
    dateModified: (post.metadata.updated || post.metadata.date).includes('T')
      ? (post.metadata.updated || post.metadata.date)
      : `${post.metadata.updated || post.metadata.date}T09:00:00+05:30`,
    inLanguage: 'en-IN',
    mainEntityOfPage: postUrl,
    author: {
      '@type': 'Person',
      name: post.metadata.author,
      jobTitle: 'Founder, Waadi Media',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    about: ['Jammu and Kashmir startups', 'Digital marketing', 'Local SEO'],
    keywords: post.metadata.keywords ? post.metadata.keywords.join(', ') : post.metadata.keyword,
  };

  const faqSchema = post.metadata.faqs && post.metadata.faqs.length > 0
    ? getFaqPageSchema(post.metadata.faqs)
    : null;

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.metadata.title, url: `/blog/${post.metadata.slug}` },
  ]);

  const showTableOfContents = post.metadata.wordCount > 1000 && post.headings.length > 0;

  return (
    <article className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <ReadingProgressBar slug={post.metadata.slug} title={post.metadata.title} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbsSchema} />

      <div className="max-w-[800px] mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="min-h-[44px] inline-flex items-center gap-2 text-xs font-medium text-mist hover:text-blue transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Notes from the valley</span>
        </Link>

        {/* Post Header */}
        <header className="space-y-6 pb-10 border-b border-line mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-mist">
            <span className="px-3 py-1 rounded-full bg-blue-tint text-blue font-medium">
              {post.metadata.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.metadata.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.metadata.readingTime}
            </span>
            {post.metadata.draft && (
              <span className="px-2.5 py-0.5 rounded-full bg-error/10 text-error font-medium">
                Draft for review
              </span>
            )}
          </div>

          <h1 className="text-h1 text-ink">
            {post.metadata.title}
          </h1>

          <p className="text-lead text-mist">
            {post.metadata.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-line text-sm">
            <div className="text-xs text-graphite">
              Written by <strong className="text-ink font-semibold">{post.metadata.author}</strong>
            </div>

            <ShareButtons title={post.metadata.title} url={postUrl} />
          </div>
        </header>

        {/* Cover Image */}
        {post.metadata.cover && (
          <div className="mb-12 overflow-hidden rounded-[24px] border-[3px] border-ink bg-paper shadow-hard-md">
            <Image
              src={post.metadata.cover}
              alt={post.metadata.coverAlt || post.metadata.title}
              width={1200}
              height={630}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Collapsible Table of Contents for posts over 1,000 words */}
        {showTableOfContents && (
          <details
            open
            aria-label="Table of contents"
            className="group p-5 bg-paper border-[3px] border-ink rounded-[20px] mb-12 shadow-hard-sm"
          >
            <summary className="font-display font-black text-sm uppercase cursor-pointer select-none min-h-[44px] flex items-center justify-between text-ink hover:text-chinar transition-colors">
              <span>In this guide</span>
              <span className="text-xs transition-transform group-open:rotate-180">▾</span>
            </summary>
            <ul className="space-y-2 text-sm pt-3 border-t-2 border-ink/15 mt-2">
              {post.headings
                .filter((h) => h.level === 2)
                .map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="text-ink hover:text-chinar transition-colors flex items-center gap-2 min-h-[36px]"
                    >
                      <span className="w-2 h-2 rounded-full bg-chinar shrink-0" />
                      <span>{heading.text}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </details>
        )}

        {/* Article Body Rendered via MDX */}
        <div className="prose-content">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        {/* Author Box */}
        <div className="mt-12 p-6 bg-paper border border-line rounded-2xl text-body text-ink">
          <p className="m-0">
            Written by{' '}
            <Link href="/about" className="text-blue hover:underline font-semibold">
              Furkan Mushtaq
            </Link>
            , founder of Waadi Media in Anantnag.
          </p>
        </div>

        {/* End of Post Share and Call to Action */}
        <div className="mt-16 pt-8 border-t border-line space-y-12">
          <div className="flex items-center justify-between">
            <span className="text-xs text-mist">Found this helpful?</span>
            <ShareButtons title={post.metadata.title} url={postUrl} />
          </div>

          {/* End-of-post box verbatim: "Want help with this? Book a free call." */}
          <div className="p-8 sm:p-10 bg-paper border border-line rounded-3xl text-center space-y-4 shadow-floating">
            <h2 className="text-h2 text-ink">
              Want help with this?
            </h2>
            <p className="text-lead text-mist max-w-md mx-auto">
              Tell us about your business and we will suggest the right next step.
            </p>
            <div className="pt-2">
              <Button href="/book-a-call" variant="primary">
                Book a free call
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-sans font-semibold text-ink">
                Related notes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group p-6 bg-paper border border-line rounded-2xl hover:border-blue transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs text-blue font-medium block mb-2">
                        {related.category}
                      </span>
                      <h4 className="text-base font-semibold text-ink group-hover:text-blue transition-colors mb-2">
                        {related.title}
                      </h4>
                      <p className="text-xs text-mist line-clamp-2">
                        {related.description}
                      </p>
                    </div>
                    <span className="text-xs text-blue font-medium mt-4 block">
                      Read note
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
