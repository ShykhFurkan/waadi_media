import React from 'react';
import { Button } from '@/components/ui/Button';
import { ValleyScene } from '@/components/illustrations/ValleyScene';
import { Container } from '@/components/layout/Container';
import { Sticker } from '@/components/ui/Sticker';
import { StickerIcon } from '@/components/illustrations/StickerSprite';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

export function CtaBandSection() {
  const whatsappUrl = whatsappLink(defaultWhatsAppMessages.general);

  return (
    <section id="cta" className="py-20 sm:py-32 bg-paper relative border-t-[3px] border-ink">
      <Container>
        {/* Giant Blue Sheet with White Text */}
        <div className="bg-blue text-white rounded-[28px] border-[4px] border-ink shadow-hard-lg overflow-hidden relative pt-16 sm:pt-24 pb-8 sm:pb-12 px-6 sm:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10">
            {/* Free First Call Sticker */}
            <div className="inline-block">
              <Sticker color="saffron" rotate={-2} icon={<StickerIcon name="star" size={18} />}>
                Free First Call
              </Sticker>
            </div>

            {/* Huge Headline in White Archivo */}
            <h2 className="text-h1 text-white tracking-tight">
              HAVE AN IDEA, OR A SITE THAT NEEDS A FRESH START?
            </h2>

            <p className="text-lead text-white/90 max-w-xl mx-auto font-medium">
              Tell us about it. The first call is free and there is zero pressure.
            </p>

            {/* Action Buttons: Saffron Button + WhatsApp Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button href="/book-a-call" variant="saffron" className="w-full sm:w-auto px-8 h-11 sm:h-[52px] text-base font-bold">
                Book a free call
              </Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neo bg-white text-ink w-full sm:w-auto h-11 sm:h-[52px] min-h-[44px] px-8 rounded-full flex items-center justify-center font-bold text-base shadow-hard-sm hover:shadow-hard-md"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Valley Art along the bottom of the CTA sheet */}
          <div className="w-full relative z-0 mt-12 sm:mt-16 pointer-events-none -mb-8 sm:-mb-12 border-t-2 border-white/20">
            <ValleyScene variant="mini" />
          </div>
        </div>
      </Container>
    </section>
  );
}
