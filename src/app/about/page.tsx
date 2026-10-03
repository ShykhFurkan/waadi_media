import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Waadi Media - A Kashmiri Digital Agency',
  description:
    'Waadi means valley. We are a Kashmir-based agency that explains technology in plain words and prices it openly.',
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-4xl mx-auto">
      <h1 className="text-h1 mb-6 text-ink">A Kashmiri agency that explains technology in plain words</h1>
      
      <div className="space-y-6 text-body mb-12">
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

      <div className="border-t border-line pt-8 mb-12">
        <h2 className="text-h2 text-ink mb-6">What we stand for</h2>
        <ul className="space-y-4">
          <li className="border-b border-line pb-4">
            <strong className="text-ink">Plain words.</strong> If we can&apos;t explain it simply, we haven&apos;t understood it.
          </li>
          <li className="border-b border-line pb-4">
            <strong className="text-ink">Honest prices.</strong> You see them before you call.
          </li>
          <li className="border-b border-line pb-4">
            <strong className="text-ink">Local first.</strong> We build for Kashmir&apos;s businesses and Kashmir&apos;s customers.
          </li>
          <li className="border-b border-line pb-4">
            <strong className="text-ink">Built to last.</strong> Fast, clear and easy to maintain.
          </li>
        </ul>
      </div>

      <div className="border-t border-line pt-8 mb-12">
        <h2 className="text-h2 text-ink mb-4">Who you&apos;ll work with</h2>
        <p className="text-body text-graphite mb-3">
          <strong className="text-ink">{siteConfig.founder.name}, founder and developer.</strong> {siteConfig.founder.bio}
        </p>
        <p className="text-sm text-mist">
          When a project needs a designer, writer, photographer or video creator, we bring in trusted creators from our circle.
        </p>
      </div>

      <div className="p-8 bg-paper border border-line rounded-3xl text-center">
        <h3 className="text-h3 text-ink mb-2">Have a project in mind?</h3>
        <p className="text-mist mb-6">The first call is free and there is no pressure.</p>
        <Link
          href="/book-a-call"
          className="inline-block px-7 py-3.5 bg-blue text-white rounded-full font-medium shadow-floating hover:bg-blue-deep transition-colors"
        >
          Book a free call
        </Link>
      </div>
    </div>
  );
}
