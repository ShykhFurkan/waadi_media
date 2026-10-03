'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, CheckCircle2, ChevronDown, Award, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function HomeHero() {
  const heroStats = [
    { label: "Bespoke Deployments", value: "10+", icon: Award },
    { label: "Regional Reach & Views", value: "100k+", icon: TrendingUp },
    { label: "Page Load Velocity", value: "< 0.8s", icon: Zap },
    { label: "Strict Code Standards", value: "100% TS", icon: ShieldCheck },
  ];

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-center bg-slate-950 text-white">
      {/* Scenic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/kashmir_hero_bg.jpg"
          alt="Breathtaking Kashmir Valley landscape background representing Waadi Media digital agency"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.82] contrast-[1.05]"
        />
        {/* Soft Vignette Overlay for Crisp Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/35 to-slate-950/90" />
      </div>

      {/* Main Centered Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center my-auto space-y-7">
        
        {/* Top Floating Glass Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-2xl px-5 py-2 text-xs font-semibold text-white border border-white/25 shadow-2xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest uppercase text-[10px] sm:text-[11px] font-bold text-blue-200">
            Jammu &amp; Kashmir&apos;s Flagship Digital Engineering &amp; AI Studio • Anantnag &amp; Srinagar
          </span>
        </motion.div>

        {/* Eye-Catching Main Headline with Luxury Editorial Font Accent */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.04] text-white drop-shadow-md"
        >
          Crafting Digital <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-blue-200 drop-shadow-sm">Eminence</span> in Kashmir<span className="text-blue-400">.</span>
        </motion.h1>

        {/* Subheadline Description with Rich Kashmir & India SEO Context */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl font-normal text-slate-100 max-w-3xl leading-relaxed drop-shadow"
        >
          Founded by Furkan Mushtaq (B.Tech CS), we engineer ultra-fast{' '}
          <span className="font-semibold text-white underline decoration-blue-400/80 underline-offset-4">Next.js web platforms</span>, custom{' '}
          <span className="font-semibold text-white underline decoration-blue-400/80 underline-offset-4">AI automation pipelines</span>, and high-conversion{' '}
          <span className="font-semibold text-white underline decoration-blue-400/80 underline-offset-4">brand growth systems</span> built to rank #1 on Google across Srinagar, Anantnag, Jammu, and across India.
        </motion.p>

        {/* Action Call-to-Action Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-bold text-slate-900 shadow-2xl hover:bg-blue-50 active:scale-95 transition-all"
          >
            <span>Initiate Your Project</span>
            <ArrowUpRight className="h-4 w-4 text-blue-600" />
          </Link>

          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-xl px-9 py-4 text-sm font-bold text-white border border-white/20 shadow-xl transition-all"
          >
            <span>Explore Case Studies</span>
          </Link>
        </motion.div>

        {/* Key Regional Market Competencies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 text-xs font-semibold text-slate-200"
        >
          {[
            "Kashmir Tourism & Houseboat Portals",
            "Pashmina & Handicraft E-Commerce",
            "SmartHire AI Talent Pipelines",
            "Top Google Search Ranking (J&K & India)",
            "Razorpay, UPI & Global Stripe Integration",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Floating Glass Stats Bar Pinned at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto w-full mt-8"
      >
        <div className="rounded-full bg-slate-900/75 backdrop-blur-2xl border border-white/20 p-4 sm:p-5 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {heroStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center justify-center px-4 py-2 md:py-0">
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                    <Icon className="h-5 w-5 text-blue-400" />
                    <span>{stat.value}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-300 tracking-wide uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-slate-300 uppercase tracking-widest border border-white/20 animate-bounce">
            <span>Discover Solutions</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
