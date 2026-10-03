import React from 'react';
import { PhoneCall, MessageSquare, Zap, CheckCircle2 } from 'lucide-react';

export function ConsultationCta() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-900 text-white relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-blue-950/60 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/20">
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              <span>Free 20-Min Strategy Consultation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Ready to Upgrade Your Brand&apos;s <span className="font-display italic font-medium text-blue-200">Digital Eminence</span> in Kashmir?
            </h2>

            <p className="text-blue-100 text-base max-w-2xl leading-relaxed">
              Consult directly with <strong>Furkan Mushtaq</strong> (Founder &amp; Lead Engineer) to audit your current platform, architect custom AI automation pipelines, or outline an aggressive Kashmir and India search ranking strategy.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-blue-100">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>Zero Obligation Proposal</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>Same-Day Kashmir Support</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>In-Person Meetings in Srinagar &amp; Anantnag</span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <a
              href="tel:+917780940317"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-900 shadow-2xl hover:bg-blue-50 active:scale-95 transition-all"
            >
              <PhoneCall className="h-4 w-4 text-blue-600" />
              <span>Call +91 7780940317</span>
            </a>

            <a
              href="https://wa.me/917780940317?text=Hi%20Waadi%20Media,%20I'm%20interested%20in%20a%20digital%20project%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950/60 hover:bg-slate-950 px-8 py-4 text-sm font-bold text-white border border-white/20 shadow-xl backdrop-blur-xl transition-all"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>Chat on WhatsApp Directly</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
