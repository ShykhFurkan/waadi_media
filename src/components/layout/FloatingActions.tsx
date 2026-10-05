'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

export function FloatingActions() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Hide mobile sticky bar when soft keyboard is open on Android/iOS
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        // If visual viewport is significantly shorter than window innerHeight, keyboard is open
        const isKeyboard = window.innerHeight - window.visualViewport.height > 150;
        setIsKeyboardOpen(isKeyboard);
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generalWhatsAppUrl = whatsappLink(defaultWhatsAppMessages.general);

  return (
    <>
      {/* Desktop Floating WhatsApp Button (bottom-right 56px circle) */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <a
          href={generalWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent({ name: 'click_whatsapp', params: { location: 'desktop_floating' } })}
          className="w-14 h-14 rounded-full bg-[#25D366] text-ink flex items-center justify-center shadow-floating hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue"
          aria-label="Chat with Waadi Media on WhatsApp"
        >
          <MessageSquare className="w-7 h-7 stroke-[1.5]" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar (56px tall + safe area inset, 44px buttons per Requirement B.7) */}
      {!isKeyboardOpen && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper border-t-[3px] border-ink px-3 flex items-center shadow-hard-md"
          style={{
            height: 'calc(56px + env(safe-area-inset-bottom, 0px))',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
            {/* 1. Phone Call */}
            <a
              href={`tel:${siteConfig.contact.tel}`}
              onClick={() => trackEvent({ name: 'click_call', params: { location: 'mobile_sticky_bar', phone: siteConfig.contact.tel } })}
              className="h-11 min-h-[44px] rounded-full border-2 border-ink flex items-center justify-center gap-1.5 text-xs font-bold text-ink bg-sky shadow-hard-sm active:translate-y-0.5 transition-transform select-none"
            >
              <Phone className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Call</span>
            </a>

            {/* 2. WhatsApp */}
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ name: 'click_whatsapp', params: { location: 'mobile_sticky_bar' } })}
              className="h-11 min-h-[44px] rounded-full border-2 border-ink flex items-center justify-center gap-1.5 text-xs font-bold text-ink bg-mint shadow-hard-sm active:translate-y-0.5 transition-transform select-none"
            >
              <MessageSquare className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>WhatsApp</span>
            </a>

            {/* 3. Book a call */}
            <Link
              href="/book-a-call"
              onClick={() => trackEvent({ name: 'cta_click', params: { label: 'Book a call', location: 'mobile_sticky_bar' } })}
              className="h-11 min-h-[44px] rounded-full border-2 border-ink bg-saffron text-ink font-bold flex items-center justify-center gap-1.5 text-xs shadow-hard-sm active:translate-y-0.5 transition-transform select-none"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Book call</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
