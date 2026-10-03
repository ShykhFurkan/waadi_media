'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Why choose a Kashmir-based digital agency like Waadi Media over Delhi or Bangalore agencies?",
      answer:
        "Waadi Media bridges Computer Science precision (founded by Furkan Mushtaq, B.Tech CS) with deep firsthand understanding of Jammu & Kashmir market dynamics. Generic mainland agencies don't understand valley buyer behavior, seasonality (tourism peak windows, winter surges), or local search intent in Srinagar, Anantnag, and Jammu. We provide direct founder accountability, local phone & WhatsApp responsiveness, and pricing tailored to high ROI.",
    },
    {
      question: "Do you integrate Indian payment gateways (UPI, Razorpay, Cashfree) and international payments?",
      answer:
        "Yes. Every e-commerce platform and booking portal we engineer supports India's complete payment ecosystem: instant UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, and cards via Razorpay and Cashfree. For Kashmir exporters (Pashmina shawls, saffron, walnut wood, dry fruits), we integrate Stripe and PayPal with multi-currency checkout (USD, EUR, GBP, AED) and automated GST-compliant invoicing.",
    },
    {
      question: "How do you guarantee websites load under 0.8s even on slow mobile networks in the Valley?",
      answer:
        "Mobile connectivity in parts of Jammu & Kashmir can fluctuate. Instead of bloated WordPress themes loaded with dozens of sluggish plugins, we handcraft ultra-lean Next.js applications with edge caching, automated AVIF/WebP image compression, server components, and static pre-rendering, ensuring instant sub-second page loads across 4G, 5G, and fiber.",
    },
    {
      question: "Can Waadi Media handle on-location 4K cinematic video shoots and drone coverage in Kashmir?",
      answer:
        "Yes! We provide complete on-location media production across Srinagar, Anantnag, Gulmarg, Pahalgam, and Dal Lake. Our production team utilizes 4K cinema cameras, gimbals, and high-altitude drone cinematography to produce viral Instagram Reels, television commercials, and sports matchday coverage (as seen with Kehribal FC).",
    },
    {
      question: "How does your local Kashmir & India SEO strategy rank us #1 on Google?",
      answer:
        "We implement deep technical SEO: Google Business Profile (GBP) optimization to capture Google's Top 3 Local Pack, comprehensive JSON-LD Schema markup, localized keyword architecture for Srinagar, Anantnag, Jammu, and high-value pan-India commercial queries, Core Web Vitals optimization, and automated XML sitemaps.",
    },
    {
      question: "How long does a project take, and what is your milestone payment structure?",
      answer:
        "Bespoke business websites and booking portals typically launch in 1 to 2 weeks. Custom AI pipelines and enterprise software span 2 to 4 weeks. We operate with transparent milestone-based billing: 40% initiation deposit, 40% upon functional staging preview, and 20% upon final live deployment and Google search submission.",
    },
  ];

  return (
    <section className="textured-bg py-24 border-b border-slate-200/80 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4 mb-14"
        >
          <div className="luxury-badge">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            Frequently Asked <span className="font-serif italic font-normal text-blue-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Everything you need to know about partnering with Waadi Media on web development, AI automation, and brand dominance in Jammu &amp; Kashmir and India.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`glass-card rounded-2xl border backdrop-blur-2xl transition-all ${
                  isOpen
                    ? 'border-blue-400 bg-white/95 shadow-md scale-[1.01]'
                    : 'border-slate-200/80 bg-white/80 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-base font-extrabold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm leading-relaxed text-slate-600 border-t border-slate-100/80 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
