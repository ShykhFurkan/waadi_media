import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { getLocalBusinessSchema } from '@/lib/seo';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact Waadi Media - Anantnag, Kashmir',
  description:
    'Call, WhatsApp or write to us. Based in Anantnag, working with clients across India. We reply within one business day.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Waadi Media - Anantnag, Kashmir',
    description:
      'Call, WhatsApp or write to us. Based in Anantnag, working with clients across India. We reply within one business day.',
    url: '/contact',
  },
};

export default function ContactPage() {
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <JsonLd data={localBusinessSchema} />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <h1 className="text-h1 text-ink mb-4">
            Let&apos;s talk about your business
          </h1>
          <p className="text-lead text-mist">
            Call, message or write. Whatever&apos;s easiest. We reply within one business day.
          </p>
        </div>

        {/* Two-column layout: Direct contact options on left, form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Tappable Direct Contact Rows */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Call */}
            <a
              href={`tel:${siteConfig.contact.tel}`}
              className="group p-6 bg-paper border border-line rounded-2xl flex items-center gap-5 hover:border-blue transition-colors focus-visible:outline-2 focus-visible:outline-blue"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-tint text-blue flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-mist block font-normal">Call us directly</span>
                <span className="text-lg sm:text-xl font-semibold text-ink group-hover:text-blue transition-colors tabular-numbers">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappLink(defaultWhatsAppMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-paper border border-line rounded-2xl flex items-center gap-5 hover:border-whatsapp transition-colors focus-visible:outline-2 focus-visible:outline-blue"
            >
              <div className="w-12 h-12 rounded-xl bg-whatsapp/10 text-whatsapp flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-mist block font-normal">Message on WhatsApp</span>
                <span className="text-lg sm:text-xl font-semibold text-ink group-hover:text-whatsapp transition-colors">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group p-6 bg-paper border border-line rounded-2xl flex items-center gap-5 hover:border-blue transition-colors focus-visible:outline-2 focus-visible:outline-blue"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-tint text-blue flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-mist block font-normal">Write to our team</span>
                <span className="text-lg sm:text-xl font-semibold text-ink group-hover:text-blue transition-colors break-all">
                  {siteConfig.contact.email}
                </span>
              </div>
            </a>

            {/* Location & Hours Info */}
            <div className="p-6 bg-paper border border-line rounded-2xl space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs uppercase tracking-wider text-mist font-semibold block">
                    Location
                  </strong>
                  <p className="text-base text-ink font-medium mt-0.5">
                    {siteConfig.location.city}, {siteConfig.location.state}
                  </p>
                  <p className="text-xs text-mist mt-0.5">
                    Serving clients across Jammu &amp; Kashmir and India
                  </p>
                </div>
              </div>

              <div className="border-t border-line pt-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs uppercase tracking-wider text-mist font-semibold block">
                    Business Hours
                  </strong>
                  <p className="text-base text-ink font-medium mt-0.5">
                    {siteConfig.contact.businessHours}
                  </p>
                  <p className="text-xs text-mist mt-0.5">
                    We reply within one business day
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Shared Contact Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-10 bg-paper border border-line rounded-3xl animate-pulse min-h-[400px]" />}>
              <ContactForm sourcePage="/contact" />
            </Suspense>
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="mt-20 pt-16 border-t border-line">
          <div className="max-w-2xl mb-8">
            <h2 className="text-h2 text-ink mb-2">Our location in Anantnag</h2>
            <p className="text-lead text-mist">
              Based in the valley. Close enough to meet in person or connect over a call.
            </p>
          </div>

          <div className="w-full overflow-hidden rounded-[28px] border border-line bg-paper shadow-floating">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.8970439720943!2d75.21139585007596!3d33.7374783179307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e20f9f983cb67d%3A0x91ab9d8edfdc7d2d!2sWaadi%20media!5e0!3m2!1sen!2sin!4v1791025594229!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Waadi Media location in Anantnag"
              className="w-full h-[400px] md:h-[450px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
