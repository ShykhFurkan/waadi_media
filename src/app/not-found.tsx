import React from 'react';
import Link from 'next/link';
import { Ridgeline } from '@/components/illustrations/Ridgeline';

export default function NotFound() {
  return (
    <div className="w-full min-h-[85vh] bg-snow text-graphite flex flex-col justify-between relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10 py-16 md:py-24">
        <div className="max-w-md space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue block">
            404 &bull; Page Not Found
          </span>
          <h1 className="text-display text-ink">
            This page has wandered off.
          </h1>
          <p className="text-lead text-mist">
            Try one of these instead:
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/services"
              className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue hover:text-blue transition-colors shadow-sm"
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue hover:text-blue transition-colors shadow-sm"
            >
              Pricing
            </Link>
            <Link
              href="/work"
              className="px-5 py-2.5 bg-paper border border-line rounded-full text-sm font-medium hover:border-blue hover:text-blue transition-colors shadow-sm"
            >
              Work
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-blue text-white rounded-full text-sm font-medium hover:bg-blue-deep transition-colors shadow-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Ridgeline visual along bottom */}
      <div className="w-full pointer-events-none opacity-85">
        <Ridgeline variant="divider" />
      </div>
    </div>
  );
}
