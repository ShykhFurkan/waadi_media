'use client';

import React from 'react';
import { Search, Compass, Code2, Rocket, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export function WaadiMethodSection() {
  const steps = [
    {
      step: "01",
      title: "Discovery & Business Audit",
      subtitle: "Understanding goals & market gaps",
      description: "We analyze your existing setup, audience demographics in Kashmir or abroad, and define key technical and branding requirements.",
      icon: Search,
      deliverables: ["Goal Blueprint", "Competitor & SEO Mapping", "Scope Definition"],
    },
    {
      step: "02",
      title: "System Architecture & Design",
      subtitle: "Crafting scalable blueprints",
      description: "Our team designs ultra-responsive UI prototypes and plans clean backend architecture for high conversions.",
      icon: Compass,
      deliverables: ["Interactive Wireframes", "Database Schema", "Design Tokens"],
    },
    {
      step: "03",
      title: "Engineering & Automation",
      subtitle: "Building with Next.js & AI",
      description: "Clean code written in Next.js, React & TypeScript with custom AI pipelines (like SmartHire) and WhatsApp bot integrations.",
      icon: Code2,
      deliverables: ["Fast Codebase (<0.8s)", "SEO & Schema Markup", "API Integrations"],
    },
    {
      step: "04",
      title: "Launch, SEO & Brand Growth",
      subtitle: "Deploying & driving reach",
      description: "Continuous monitoring, Google Maps pack ranking, social media Reels growth, and performance ad optimization.",
      icon: Rocket,
      deliverables: ["Vercel/AWS Deployment", "Local Kashmir SEO", "Monthly Analytics"],
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="textured-bg py-24 border-b border-slate-200/80 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="luxury-badge">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Engineering Process</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            The Waadi <span className="font-serif italic font-normal text-blue-600">Execution Method</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            A disciplined, 4-phase engineering framework designed to take your idea from concept to a high-converting digital platform.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card glass-card-hover group relative flex flex-col justify-between rounded-3xl p-8 bg-white/85 backdrop-blur-2xl border border-slate-200/90 shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-5xl font-light text-blue-600/35 group-hover:text-blue-600 transition-colors">
                      {item.step}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Deliverables</div>
                  {item.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/method"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Learn more about our development framework &rarr;</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
