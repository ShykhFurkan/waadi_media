import React from 'react';
import { Button } from '@/components/ui/Button';
import { Ridgeline } from '@/components/illustrations/Ridgeline';
import { Container } from '@/components/layout/Container';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

export function CtaBandSection() {
  const whatsappUrl = whatsappLink(defaultWhatsAppMessages.general);

  return (
    <section id="cta" className="relative py-32 sm:py-44 bg-snow border-t border-line overflow-hidden">
      {/* Ridgeline as a low quiet backdrop */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
        <Ridgeline variant="backdrop" />
      </div>

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-xs uppercase tracking-widest text-mist font-semibold block">
            Start a Project
          </span>

          {/* Huge Display Headline */}
          <h2 className="font-display text-[clamp(2.75rem,6.5vw,5.75rem)] font-normal text-ink leading-[0.98] tracking-tight text-balance">
            Have an idea, or a website that needs a fresh start?
          </h2>

          <p className="text-lead text-graphite max-w-xl mx-auto text-balance">
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
              className="inline-flex items-center justify-center font-sans font-medium text-[16px] h-[52px] px-8 rounded-full border border-ink text-ink bg-paper hover:bg-snow focus-visible:outline-2 focus-visible:outline-blue transition-colors"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
