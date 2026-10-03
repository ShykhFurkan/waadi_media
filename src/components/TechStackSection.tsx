'use client';

import React, { useState } from 'react';
import { Code2, Cpu, Globe2, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TechStackSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const categories = [
    {
      title: "Web Engineering",
      icon: Globe2,
      subtitle: "Ultra-fast Next.js & React Architectures",
      items: [
        { name: "Next.js 14 App Router", desc: "Server side rendering & static optimization" },
        { name: "React 19 & TypeScript", desc: "Strict type safety & component reusability" },
        { name: "Tailwind CSS", desc: "Modern styling & responsive layouts" },
        { name: "REST APIs & Webhooks", desc: "Seamless third-party system integration" },
      ],
    },
    {
      title: "AI & Automations",
      icon: Cpu,
      subtitle: "Custom AI Pipelines & Internal Workflows",
      items: [
        { name: "SmartHire AI Pipeline", desc: "Automated candidate assessment system" },
        { name: "WhatsApp Business API", desc: "Automated lead routing & invoice notifications" },
        { name: "Python / AI Integrations", desc: "Resume parsing & custom NLP workflows" },
        { name: "CRM & DB Automation", desc: "Offline-first sync & cloud databases" },
      ],
    },
    {
      title: "SEO & Growth Engine",
      icon: Code2,
      subtitle: "Built specifically to dominate local Kashmir search",
      items: [
        { name: "JSON-LD Schema Markup", desc: "Rich snippets for Google & AI search tools" },
        { name: "Google Maps Pack Ranking", desc: "Hyper-local SEO strategy for Kashmir Valley" },
        { name: "Core Web Vitals Optimized", desc: "<0.8s load times & 100% mobile responsiveness" },
        { name: "Dynamic XML Sitemaps", desc: "Automatic search engine indexing & crawlability" },
      ],
    },
    {
      title: "Media & Brand Growth",
      icon: Share2,
      subtitle: "Cinematic Content & Social Page Management",
      items: [
        { name: "4K Reels & Shorts Shoots", desc: "High production value for local brands" },
        { name: "Kehribal FC Management", desc: "End-to-end sports social media management" },
        { name: "Brand Identity Systems", desc: "Logos, color palettes & marketing materials" },
        { name: "Monthly Content Planning", desc: "Structured growth strategies across platforms" },
      ],
    },
  ];

  return (
    <section className="textured-bg py-24 border-b border-slate-200/80 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="luxury-badge">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Modern Tech Stack &amp; Standards</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            Engineered with <span className="font-serif italic font-normal text-blue-600">State-of-the-Art</span> Tools
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            We avoid fragile templates and WordPress bloatware. Every platform is handcrafted using clean Next.js architecture, strict TypeScript, and intelligent AI workflows.
          </p>
        </motion.div>

        {/* Tab Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/25 scale-[1.03]'
                    : 'glass-card bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white hover:shadow-md'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 glass-card rounded-3xl border border-slate-200/90 bg-white/85 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mb-8 space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {categories[activeTab].subtitle}
                </h3>
                <p className="text-xs text-slate-600">
                  Built for reliability, speed, and continuous scalability without technical debt.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories[activeTab].items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl bg-white/95 backdrop-blur-md p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                      <div className="font-bold text-slate-900 text-base leading-tight">
                        {item.name}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
