import React from 'react';
import { Button } from '@/components/ui/Button';
import { Ridgeline } from '@/components/illustrations/Ridgeline';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

export function CtaBandSection() {
  const whatsappUrl = whatsappLink(defaultWhatsAppMessages.general);

  return (
    <section className="relative py-28 md:py-36 bg-snow border-t border-line overflow-hidden flex flex-col justify-between">
      {/* Background Ridgeline */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-40 z-0">
        <Ridgeline variant="divider" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center space-y-6">
        <h2 className="text-h2 text-ink text-balance">
          Have an idea, or a website that needs a fresh start?
        </h2>

        <p className="text-lead text-mist max-w-xl mx-auto text-balance">
          Tell us about it. The first call is free and there is no pressure.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/book-a-call" variant="primary" magnetic>
            Book a free call
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-sans font-medium text-[16px] h-[52px] px-7 rounded-full border-[1.5px] border-ink text-ink bg-transparent hover:bg-paper focus-visible:outline-2 focus-visible:outline-blue transition-colors"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
