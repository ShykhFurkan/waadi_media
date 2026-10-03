import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { getProfessionalServiceSchema, getBreadcrumbSchema } from '@/lib/seo';
import { Mountain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Waadi Media - A Kashmiri Digital Agency',
  description:
    'Waadi means valley. We are a Kashmir-based agency that explains technology in plain words and prices it openly.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Waadi Media - A Kashmiri Digital Agency',
    description:
      'Waadi means valley. We are a Kashmir-based agency that explains technology in plain words and prices it openly.',
    url: '/about',
  },
};

export default function AboutPage() {
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);
  const professionalServiceSchema = getProfessionalServiceSchema();

  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <JsonLd data={breadcrumbsSchema} />
      <JsonLd data={professionalServiceSchema} />

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 space-y-16 md:space-y-24">
        {/* Header and Story Section */}
        <div className="max-w-3xl space-y-8">
          <h1 className="text-h1 text-ink">
            A Kashmiri agency that explains technology in plain words
          </h1>

          {/* Story: 3 short paragraphs per Section 10.5 */}
          <div className="space-y-6 text-lead text-graphite font-light leading-relaxed">
            <p>
              <em>Waadi means valley. We chose the name because it&apos;s where we&apos;re from, and because a valley is where things grow.</em>
            </p>
            <p>
              Waadi Media started in Anantnag in 2026. It began with our founder, Furkan Mushtaq, building websites for local businesses. Now it&apos;s a full agency, so a business can get its brand, website, marketing and software from one team.
            </p>
            <p>
              We kept seeing the same problem. Good Kashmiri businesses were held back because technology felt confusing, and many agencies spoke in jargon, hid their prices or were far away. We decided to do it differently: speak plainly, show prices, and stay close.
            </p>
          </div>
        </div>

        {/* Illustration Placeholder: Quiet valley at dawn (Section 6.9) */}
        <div className="rounded-3xl border border-line bg-gradient-to-b from-blue-tint/60 via-snow to-paper p-10 md:p-14 text-center overflow-hidden relative shadow-floating">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue/10 text-blue mx-auto flex items-center justify-center">
              <Mountain className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block">
              The Valley at Dawn
            </span>
            <p className="text-sm text-mist italic font-display">
              &ldquo;Built in the valley. Made for your business.&rdquo;
            </p>
          </div>
        </div>

        {/* What We Stand For: 4 short statements in a list (NO CARDS per Section 10.5) */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              What we stand for
            </h2>
            <p className="text-lead text-mist mt-1">
              Four principles that guide every project we take on.
            </p>
          </div>

          <div className="divide-y divide-line">
            <div className="py-6 first:pt-2">
              <h3 className="text-xl font-sans font-semibold text-ink mb-1">
                Plain words.
              </h3>
              <p className="text-body text-graphite">
                If we can&apos;t explain it simply, we haven&apos;t understood it.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-xl font-sans font-semibold text-ink mb-1">
                Honest prices.
              </h3>
              <p className="text-body text-graphite">
                You see them before you call.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-xl font-sans font-semibold text-ink mb-1">
                Local first.
              </h3>
              <p className="text-body text-graphite">
                We build for Kashmir&apos;s businesses and Kashmir&apos;s customers.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-xl font-sans font-semibold text-ink mb-1">
                Built to last.
              </h3>
              <p className="text-body text-graphite">
                Fast, clear and easy to maintain.
              </p>
            </div>
          </div>
        </div>

        {/* Who You'll Work With */}
        <div className="border-t border-line pt-12 space-y-6">
          <h2 className="text-h2 text-ink">
            Who you&apos;ll work with
          </h2>

          <div className="space-y-4 max-w-2xl">
            <p className="text-body text-graphite leading-relaxed">
              <strong className="text-ink font-semibold">{siteConfig.founder.name}, founder and developer.</strong>{' '}
              Computer science engineer from Anantnag. He builds the websites and software and talks to clients directly.
            </p>
            <p className="text-sm text-mist leading-relaxed italic">
              When a project needs a designer, writer, photographer or video creator, we bring in trusted creators from our circle.
            </p>
          </div>
        </div>

        {/* Call to Action Band */}
        <div className="pt-12 border-t border-line">
          <div className="p-8 sm:p-12 bg-paper border border-line rounded-3xl text-center space-y-4 shadow-floating">
            <h2 className="text-h2 text-ink">
              Have a project in mind?
            </h2>
            <p className="text-lead text-mist max-w-md mx-auto">
              Tell us about your business. The first call is free and there is no pressure.
            </p>
            <div className="pt-2">
              <Button href="/book-a-call" variant="primary">
                Book a free call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
