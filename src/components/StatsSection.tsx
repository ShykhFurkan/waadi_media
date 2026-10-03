'use client';

import React from 'react';
import { Award, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export function StatsSection() {
  const stats = [
    {
      value: "10+",
      label: "Projects Delivered",
      sublabel: "Web apps, AI tools & brands",
      icon: Award,
    },
    {
      value: "100k+",
      label: "Social Impressions",
      sublabel: "Driven for Kashmir brands",
      icon: TrendingUp,
    },
    {
      value: "< 0.8s",
      label: "Avg. Page Load Speed",
      sublabel: "Ultra-fast Next.js engineering",
      icon: Zap,
    },
    {
      value: "100%",
      label: "Custom Code Base",
      sublabel: "No bloat, pure React & TS",
      icon: ShieldCheck,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 textured-bg-dark text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card-dark group relative rounded-3xl p-6 sm:p-8 backdrop-blur-2xl hover:border-blue-500/50 transition-all shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 bg-blue-950/70 px-3 py-1 rounded-full border border-blue-800/60">
                    Live Metric
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-1">
                  {stat.value}
                </div>

                <div className="text-sm font-bold text-slate-100">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.sublabel}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
