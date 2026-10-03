// Draft: have a qualified legal professional review before launch.
import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy - Waadi Media',
  description: 'How Waadi Media collects, uses and protects your data in plain words.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-3xl mx-auto">
      <h1 className="text-h1 mb-6 text-ink">Privacy Policy</h1>
      <p className="text-sm text-mist mb-8">Last updated: October 2026</p>

      <div className="space-y-8 text-body">
        <section>
          <h2 className="text-h3 text-ink mb-2">1. Plain language summary</h2>
          <p>
            We respect your privacy. We do not sell your personal data or track you across other websites.
            In compliance with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP), we only collect
            the minimum information needed to respond to your project inquiries and provide web services.
          </p>
        </section>

        <section>
          <h2 className="text-h3 text-ink mb-2">2. What information we collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contact inquiries:</strong> Name, phone number or WhatsApp handle, optional email, and project details submitted via our contact forms.</li>
            <li><strong>Call bookings:</strong> Name, contact details, and meeting times scheduled through our Cal.com booking link.</li>
            <li><strong>Analytics:</strong> Anonymized website usage statistics collected via Google Analytics 4 to understand which pages visitors find helpful.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h3 text-ink mb-2">3. Third-party processors</h2>
          <p>We work with trusted infrastructure providers to operate this website:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Vercel:</strong> Website hosting and edge distribution.</li>
            <li><strong>Resend:</strong> Secure transactional email delivery for contact forms.</li>
            <li><strong>Cal.com:</strong> Meeting scheduling.</li>
            <li><strong>Google Analytics:</strong> Anonymized web traffic metrics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h3 text-ink mb-2">4. Your rights & data deletion</h2>
          <p>
            You can request a copy of the information you submitted to us, or ask us to delete it at any time,
            by emailing <a href={`mailto:${siteConfig.contact.email}`} className="text-blue underline">{siteConfig.contact.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
