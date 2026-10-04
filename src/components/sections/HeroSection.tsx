import React from 'react';
import { Button } from '@/components/ui/Button';
import { Ridgeline } from '@/components/illustrations/Ridgeline';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-32 sm:pt-40 overflow-hidden bg-snow">
      {/* Top Hero Text Container */}
      <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8 z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl space-y-6">
          {/* Masked Line-by-Line Reveal for Headline
              Both lines in semantic H1, painted immediately in server HTML, animated via CSS */}
          <h1 className="text-display text-ink space-y-1">
            <span className="block overflow-hidden">
              <span
                className="block animate-hero-reveal"
                style={{ animationDelay: '0.05s' }}
              >
                Built in the valley.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block animate-hero-reveal"
                style={{ animationDelay: '0.2s' }}
              >
                Made for your business.
              </span>
            </span>
          </h1>

          {/* Lead Text - painted immediately for optimal LCP */}
          <p className="text-lead text-graphite max-w-2xl text-balance">
            Websites, branding, marketing and software for Kashmir&apos;s businesses. Explained simply, priced openly, delivered fast.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button href="/book-a-call" variant="primary" magnetic>
              Book a free call
            </Button>
            <Button href="/work" variant="secondary">
              See our work
            </Button>
          </div>

          {/* Small line under buttons per Section 10.1 */}
          <p className="text-xs text-mist pt-1">
            Based in Anantnag. Working with clients across India.
          </p>
        </div>
      </div>

      {/* Signature Ridgeline filling lower 40% of hero */}
      <div className="w-full relative z-0 mt-8 pointer-events-none">
        <Ridgeline variant="hero" />
      </div>
    </section>
  );
}
