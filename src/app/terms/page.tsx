// Draft: have a qualified legal professional review before launch.
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Waadi Media',
  description: 'Terms and conditions governing projects, estimates and website use with Waadi Media.',
};

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-3xl mx-auto">
      <h1 className="text-h1 mb-6 text-ink">Terms of Service</h1>
      <p className="text-sm text-mist mb-8">Last updated: October 2026</p>

      <div className="space-y-8 text-body">
        <section>
          <h2 className="text-h3 text-ink mb-2">1. Estimates and written scopes</h2>
          <p>
            Prices published on this site and estimates generated via our pricing calculator are indicative starting figures.
            They do not constitute binding commercial offers until a formal written proposal and scope agreement is signed
            by both parties.
          </p>
        </section>

        <section>
          <h2 className="text-h3 text-ink mb-2">2. Intellectual property & ownership</h2>
          <p>
            Once a project is paid for in full according to the agreed milestones, full ownership of the final design files,
            custom website code, and delivered creative assets transfers to the client. [CONFIRM]
          </p>
        </section>

        <section>
          <h2 className="text-h3 text-ink mb-2">3. Payment terms</h2>
          <p>
            Standard one-time projects require a 50% initial deposit prior to kickoff and the remaining 50% upon final delivery
            and staging approval. Monthly retainers are invoiced at the beginning of each billing cycle. [CONFIRM]
          </p>
        </section>

        <section>
          <h2 className="text-h3 text-ink mb-2">4. Governing law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising in connection with our services shall be
            subject to the exclusive jurisdiction of the competent courts in Anantnag, Jammu & Kashmir. [CONFIRM]
          </p>
        </section>
      </div>
    </div>
  );
}
