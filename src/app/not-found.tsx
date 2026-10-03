import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue mb-3 block">404 Error</span>
        <h1 className="text-display mb-4 text-ink">This page has wandered off.</h1>
        <p className="text-lead text-mist mb-8">
          Try one of these instead:
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/services"
            className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue transition-colors"
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/work"
            className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue transition-colors"
          >
            Work
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-blue text-white rounded-full text-sm font-medium hover:bg-blue-deep transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
