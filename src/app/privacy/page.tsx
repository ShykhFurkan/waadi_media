// Draft: have a qualified legal professional review before launch.
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy - Waadi Media',
  description: 'How Waadi Media collects, uses and protects your data in plain words.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 space-y-10">
        <nav aria-label="Breadcrumb" className="text-xs text-mist font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-blue transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Privacy Policy</span>
        </nav>

        <div className="space-y-3">
          <h1 className="text-h1 text-ink">Privacy Policy</h1>
          <p className="text-sm text-mist">Last updated: October 2026</p>
        </div>

        <div className="space-y-8 text-body leading-relaxed divide-y divide-line">
          <section className="space-y-3 pt-6 first:pt-0">
            <h2 className="text-h3 text-ink">1. Plain language summary</h2>
            <p>
              We respect your privacy. We do not sell your personal data, rent your contact details, or track your activity across unrelated websites.
              In accordance with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act), we only collect the minimum personal data required to answer your inquiries, scope web projects, and provide contracted digital services.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">2. What information we collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-graphite">
              <li>
                <strong>Project inquiries &amp; contact forms:</strong> Your name, phone number, WhatsApp contact, email address, company name, and project notes submitted via our website forms.
              </li>
              <li>
                <strong>Call bookings:</strong> Your name, contact details, timezone, and discussion topics scheduled through our Cal.com calendar integration.
              </li>
              <li>
                <strong>Website analytics:</strong> Anonymized web usage metrics via Google Analytics 4 (such as pages visited, device category, approximate city-level region, and referral sources) to help us understand how visitors use our site.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">3. Why we collect this data</h2>
            <p>
              We collect this information strictly to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-graphite">
              <li>Respond to your service inquiries and prepare transparent price estimates.</li>
              <li>Schedule and host initial consultation calls.</li>
              <li>Deliver website design, development, SEO, and branding work requested by you.</li>
              <li>Monitor website reliability, diagnose technical errors, and prevent spam or abuse.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">4. Third-party processors</h2>
            <p>
              To run our agency website securely, we rely on established infrastructure providers:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-graphite">
              <li><strong>Vercel:</strong> Web hosting, global content delivery, and serverless compute.</li>
              <li><strong>Nodemailer (SMTP):</strong> Secure transactional email delivery for contact form notifications.</li>
              <li><strong>Cal.com:</strong> Self-serve calendar scheduling for discovery calls.</li>
              <li><strong>Google Analytics:</strong> Aggregated, privacy-compliant website traffic metrics.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">5. Data retention</h2>
            <p>
              We keep client inquiry data for as long as necessary to fulfill project requirements or maintain commercial communication. If an inquiry does not lead to an active project, contact records are purged periodically or upon request.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">6. Your rights and data deletion</h2>
            <p>
              Under India&apos;s DPDP Act 2023, you have the right to request access to any personal data we hold about you, request corrections, or request complete deletion of your records. To exercise any of these rights, email us directly at{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-blue underline hover:text-blue-deep transition-colors">
                {siteConfig.contact.email}
              </a>
              . We respond to all requests within five business days.
            </p>
          </section>

          <section className="space-y-3 pt-6">
            <h2 className="text-h3 text-ink">7. Contact us</h2>
            <p>
              If you have any questions regarding our privacy practices, please contact:
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
