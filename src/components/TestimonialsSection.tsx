'use client';

import React from 'react';
import { Star, Quote, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Waadi Media completely transformed our brand presence on social media. From 4K matchday reels to sponsor PR and fan engagement, our reach expanded by over 100k impressions in Kashmir.",
      author: "Kehribal FC Management",
      role: "Official Football Club",
      location: "Anantnag, Kashmir",
      metric: "100k+ Reach & Fan Engagement",
      stars: 5,
      projectTag: "Social Media & Brand Growth",
    },
    {
      quote: "Furkan and the Waadi Media team engineered a travel booking platform for Wonder Delight Travels. Our website loads under 0.8 seconds and handles custom tour inquiries smoothly.",
      author: "Wonder Delight Travels",
      role: "Tour & Travel Operator",
      location: "Kashmir Valley",
      metric: "Custom Tour Booking Portal",
      stars: 5,
      projectTag: "Web Development & E-Commerce",
    },
    {
      quote: "The educational consultancy portal designed by Waadi Media streamlined our student lead generation for MBBS admissions abroad. Highly professional and responsive communication.",
      author: "Kaali Edge Consultancy",
      role: "Educational Consultants",
      location: "Srinagar, J&K",
      metric: "High-Conversion Lead System",
      stars: 5,
      projectTag: "Portal & Software Engineering",
    },
  ];

  return (
    <section className="textured-bg-dark py-24 text-white relative overflow-hidden border-b border-slate-800">
      {/* Ambient Radial Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="luxury-badge-dark">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Client Feedback &amp; Real Impact</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            Trusted by Visionary Brands in <span className="font-serif italic font-normal text-blue-300">Kashmir &amp; India</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            See how our bespoke Next.js platforms, intelligent AI workflows, and viral social campaigns drive measurable commercial growth.
          </p>
        </motion.div>

        {/* Testimonials Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="glass-card-dark flex flex-col justify-between rounded-3xl p-8 shadow-2xl backdrop-blur-2xl hover:border-blue-500/40 transition-all space-y-6"
            >
              <div className="space-y-4">
                {/* Rating & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="rounded-full bg-blue-950/80 border border-blue-800/60 px-3 py-1 text-[10px] font-bold text-blue-300">
                    {t.projectTag}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif text-base leading-relaxed text-slate-200 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Impact Metric Badge */}
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-emerald-400 border border-slate-700">
                  <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                  <span>{t.metric}</span>
                </div>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-base">{t.author}</div>
                  <div className="text-xs text-slate-400">{t.role} • {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
