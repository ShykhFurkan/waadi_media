import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact Waadi Media - Anantnag, Kashmir',
  description:
    'Call, WhatsApp or write to us. Based in Anantnag, working with clients across India. We reply within one business day.',
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-5xl mx-auto">
      <h1 className="text-h1 mb-4 text-ink">Let&apos;s talk about your business</h1>
      <p className="text-lead text-mist mb-12">
        Call, message or write. Whatever&apos;s easiest. We reply within one business day. [CONFIRM]
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Direct contact column */}
        <div className="space-y-6">
          <div className="p-6 bg-paper border border-line rounded-2xl">
            <span className="text-xs uppercase tracking-wider text-mist font-semibold">Phone & WhatsApp</span>
            <a
              href={`tel:${siteConfig.contact.tel}`}
              className="block text-2xl font-bold text-ink hover:text-blue mt-1"
            >
              {siteConfig.contact.phone}
            </a>
            <div className="mt-4">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 bg-[#25D366] text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="p-6 bg-paper border border-line rounded-2xl">
            <span className="text-xs uppercase tracking-wider text-mist font-semibold">Email</span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block text-xl font-medium text-ink hover:text-blue mt-1"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <div className="p-6 bg-paper border border-line rounded-2xl">
            <span className="text-xs uppercase tracking-wider text-mist font-semibold">Location & Hours</span>
            <p className="text-lg font-medium text-ink mt-1">{siteConfig.location.addressString}</p>
            <p className="text-sm text-mist mt-1">{siteConfig.contact.businessHours}</p>
          </div>
        </div>

        {/* Form placeholder / preview */}
        <div className="p-8 bg-paper border border-line rounded-3xl">
          <h2 className="text-h3 text-ink mb-4">Send a message</h2>
          <p className="text-sm text-mist mb-6">
            Tell us about your project. We review every enquiry personally.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-graphite mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Furkan Mushtaq"
                className="w-full h-13 px-4 rounded-xl border-1.5 border-line bg-paper text-ink"
                disabled
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-graphite mb-1">Phone or WhatsApp</label>
              <input
                type="tel"
                placeholder="+91 77809 40317"
                className="w-full h-13 px-4 rounded-xl border-1.5 border-line bg-paper text-ink"
                disabled
              />
            </div>
            <button
              type="button"
              className="w-full h-13 bg-blue text-white rounded-full font-medium hover:bg-blue-deep transition-colors"
            >
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
