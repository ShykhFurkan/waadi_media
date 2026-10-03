'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

export function FloatingActions() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
        <motion.a
          href={generalWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent({ name: 'click_whatsapp', params: { location: 'desktop_floating' } })}
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-floating hover:opacity-95 transition-opacity focus-visible:outline-2 focus-visible:outline-blue"
          aria-label="Chat with Waadi Media on WhatsApp"
        >
          <MessageSquare className="w-7 h-7 stroke-[1.5]" />
        </motion.a>
      </div>

      {/* Mobile Sticky Bottom Bar (3 equal buttons: Call, WhatsApp, Book a call) */}
      {!isKeyboardOpen && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-line px-3 py-2 shadow-floating">
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {/* Call */}
            <a
              href={`tel:${siteConfig.contact.tel}`}
              onClick={() => trackEvent({ name: 'click_call', params: { location: 'mobile_sticky_bar' } })}
              className="h-11 rounded-full border border-line bg-snow text-ink flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-paper active:scale-95 transition-transform"
            >
              <Phone className="w-3.5 h-3.5 stroke-[1.5] text-blue" />
              <span>Call</span>
            </a>

            {/* WhatsApp */}
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ name: 'click_whatsapp', params: { location: 'mobile_sticky_bar' } })}
              className="h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center gap-1.5 text-xs font-medium hover:opacity-95 active:scale-95 transition-transform"
            >
              <MessageSquare className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>WhatsApp</span>
            </a>

            {/* Book a call */}
            <Link
              href="/book-a-call"
              onClick={() => trackEvent({ name: 'cta_click', params: { label: 'Book a call', location: 'mobile_sticky_bar' } })}
              className="h-11 rounded-full bg-blue text-white flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-blue-deep active:scale-95 transition-transform"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Book call</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
