// Draft: have a qualified legal professional review before launch.
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service - Waadi Media',
  description: 'Terms and conditions governing projects, estimates, and website use with Waadi Media.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-mist font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-blue transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Terms of Service</span>
        </nav>

        <div className="space-y-3">
          <h1 className="text-h1 text-ink">Terms of Service</h1>
          <p className="text-sm text-mist">Last updated: October 2026</p>
        </div>

        <div className="space-y-8 text-body leading-relaxed divide-y divide-line">
          <section className="space-y-3 pt-6 first:pt-0">
            <h2 className="text-h3 text-ink">1. Use of this website</h2>
            <p>
              By accessing waadimedia.com, you agree to use our website for lawful inquiries and legitimate commercial discussions. You agree not to submit malicious code, abuse our contact forms, or attempt unauthorized access to our infrastructure.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">2. Estimates and commercial offers</h2>
            <p>
              All prices shown on this website, including package prices and interactive calculator estimates, are indicative starting figures designed to help you plan your budget.
            </p>
            <p>
              An estimate does not constitute a legally binding commercial offer. A binding contract is formed only when a formal written proposal, milestone schedule, and scope of work is signed or mutually confirmed in writing by both parties.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">3. Intellectual property &amp; asset ownership</h2>
            <p>
              We believe in full client ownership. Once a project is paid in full, you own your domain, website code, content and accounts. All custom design files and brand assets created specifically for you transfer directly to your business.
            </p>
            <p>
              Waadi Media retains ownership of proprietary agency boilerplates, pre-existing code libraries, and generic developer tools used during production. Waadi Media also reserves the right to display completed project screenshots and case studies in our portfolio, unless a formal non-disclosure agreement (NDA) is executed prior to kickoff.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">4. Payment terms &amp; milestones</h2>
            <p>
              For standard fixed-scope projects (such as website design or brand identity), payment is 50% to start and 50% on delivery. For software and apps, payment is split into milestones agreed in writing before work begins.
            </p>
            <p>
              For ongoing monthly retainers (such as SEO, digital advertising, or website care), invoices are issued at the start of each billing period. Monthly retainers run on a 3-month initial period, then month-to-month. Cancel anytime with 30 days notice.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">5. Client responsibilities &amp; content</h2>
            <p>
              To complete projects on time, clients are responsible for providing necessary brand materials, high-resolution photography, text copy (unless copywriting is contracted), and timely feedback on milestone reviews.
            </p>
            <p>
              Clients warrant that all text, imagery, trademarks, and media provided to Waadi Media are owned by the client or properly licensed.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">6. Limitation of liability</h2>
            <p>
              While we build robust, high-performance digital systems adhering to modern security standards, Waadi Media shall not be liable for indirect, incidental, or consequential damages, loss of business revenue, or downtime resulting from third-party hosting outages, payment gateway interruptions, or search engine algorithm updates.
            </p>
            <p>
              Our total liability under any service agreement shall not exceed the total fees paid by the client for the specific project or phase in question.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">7. Governing law &amp; jurisdiction</h2>
            <p>
              These Terms of Service and any commercial agreements entered into with Waadi Media shall be governed by and construed in accordance with the laws of India.
            </p>
            <p>
              Any disputes, controversies, or claims arising out of or relating to our services shall be subject to the exclusive jurisdiction of the competent courts in Anantnag, Jammu &amp; Kashmir, India.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">8. Contact information</h2>
            <p>
              For questions regarding our terms or legal inquiries, please contact:
            </p>
            <p className="text-ink font-medium">
              Waadi Media<br />
              Anantnag, Jammu &amp; Kashmir, India<br />
              Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-blue underline">{siteConfig.contact.email}</a><br />
              Phone / WhatsApp: {siteConfig.contact.phone}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
