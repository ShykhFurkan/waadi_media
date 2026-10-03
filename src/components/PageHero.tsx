'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';

export interface PageHeroStat {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface PageHeroProps {
  badge: string;
  title: string;
  highlightText?: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
  bgImage?: string;
  stats?: PageHeroStat[];
}

export function PageHero({
  badge,
  title,
  highlightText,
  description,
  breadcrumbs,
  bgImage = '/kashmir_hero_bg.jpg',
  stats,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[45vh] sm:min-h-[50vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden text-center bg-slate-950 text-white">
      {/* Scenic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-center scale-105 filter brightness-[0.8] contrast-[1.05]"
        />
        {/* Gradient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center my-auto space-y-6">
        
        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20"
          >
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-blue-300 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-bold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-xl px-5 py-2 text-xs font-semibold text-white border border-white/30 shadow-lg"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-300" />
          <span>{badge}</span>
        </motion.div>

        {/* Title with Luxury Font Pairing */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-md"
        >
          {title}{" "}
          {highlightText && (
            <span className="font-serif italic font-normal text-blue-200 drop-shadow-sm">{highlightText}</span>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-xl font-normal text-slate-100 max-w-2xl leading-relaxed drop-shadow"
        >
          {description}
        </motion.p>
      </div>

      {/* Optional Floating Stats Bar at bottom */}
      {stats && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto w-full mt-8"
        >
          <div className="rounded-full bg-slate-900/75 backdrop-blur-2xl border border-white/20 p-4 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center px-4 py-1.5">
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
                    {stat.icon}
                    <span>{stat.value}</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-300 tracking-wide uppercase mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
