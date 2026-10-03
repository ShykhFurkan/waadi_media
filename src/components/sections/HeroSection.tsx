'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { Ridgeline } from '@/components/illustrations/Ridgeline';
import { easeCustom } from '@/components/ui/MotionHelpers';

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-32 sm:pt-40 overflow-hidden bg-snow">
      {/* Top Hero Text Container */}
      <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8 z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl space-y-6">
          {/* Masked Line-by-Line Reveal for Headline */}
          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease: easeCustom }}
                className="text-display text-ink"
              >
                Built in the valley.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: easeCustom }}
                className="text-display text-ink"
              >
                Made for your business.
              </motion.div>
            </div>
          </div>

          {/* Lead Text */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeCustom }}
            className="text-lead text-graphite max-w-2xl text-balance"
          >
            Websites, branding, marketing and software for Kashmir&apos;s businesses. Explained simply, priced openly, delivered fast.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: easeCustom }}
            className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button href="/book-a-call" variant="primary" magnetic>
              Book a free call
            </Button>
            <Button href="/work" variant="secondary">
              See our work
            </Button>
          </motion.div>

          {/* Small line under buttons per Section 10.1 */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-xs text-mist pt-1"
          >
            Based in Anantnag. Working with clients across India.
          </motion.p>
        </div>
      </div>

      {/* Signature Ridgeline filling lower 40% of hero */}
      <div className="w-full relative z-0 mt-8 pointer-events-none">
        <Ridgeline variant="hero" />
      </div>
    </section>
  );
}
