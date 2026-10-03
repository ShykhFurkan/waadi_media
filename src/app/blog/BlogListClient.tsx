'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Tag, Sparkles, User, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '@/data/blogs';

interface BlogListClientProps {
  initialPosts: BlogPost[];
}

export function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(initialPosts.map((p) => p.category)))];
    return cats;
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 pb-4 border-b border-slate-200">
        {/* Search Input - 44px min-h and 16px mobile font to prevent iOS zoom */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search guides (e.g. SEO, Saffron, Costs)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 min-h-[44px] text-base md:text-sm rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
          />
        </div>

        {/* Category Pills - Smooth horizontal swipe on mobile, wrap on desktop */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full md:w-auto md:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-3">
          <Sparkles className="h-8 w-8 text-blue-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No guides found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset your category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group glass-card glass-card-hover rounded-3xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 font-medium">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Quick Key Takeaway Preview */}
                {post.takeaways && post.takeaways.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 italic">{post.takeaways[0]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                    FM
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-800">{post.author}</span>
                    <span className="text-[10px] text-slate-400 block">{post.date}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
