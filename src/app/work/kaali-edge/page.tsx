import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { GraduationCap, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Kaali Edge Educational Consultancy Case Study | Waadi Media',
    description: 'International educational consultancy platform built by Waadi Media for Kaali Edge, guiding students for MBBS & higher education abroad in Uzbekistan, Kazakhstan, Russia, Georgia, and Bangladesh.',
    path: '/work/kaali-edge'
});

export default function KaaliEdgeCaseStudyPage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Kaali Edge Consultancy", url: "/work/kaali-edge" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                            Educational Consultancy Platform
                        </span>
                        <a
                            href="https://www.kaaliedge.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <span>Visit kaaliedge.com</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Kaali Edge Educational <br />
                        <span className="text-blue-600 dark:text-blue-500">Consultancy Platform</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        Waadi Media designed and engineered a global admissions website for Kaali Edge, connecting students across India and internationally to top medical universities in Uzbekistan, Kazakhstan, Kyrgyzstan, Russia, Georgia, and Bangladesh.
                    </p>
                </div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-video bg-slate-900">
                    <Image src="/kaali-edge-mockup.png" alt="Kaali Edge Educational Consultancy" fill className="object-cover" />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">MBBS Abroad</div>
                        <div className="text-xs text-slate-500">Medical Admissions Focus</div>
                    </div>
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">6+ Countries</div>
                        <div className="text-xs text-slate-500">Uzbekistan, Russia, Georgia+</div>
                    </div>
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">2026-27</div>
                        <div className="text-xs text-slate-500">Admissions Portal Live</div>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Scope & Deliverables</h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Global Admissions Application Portal</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Country & University Course Directory</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Lead Routing & WhatsApp Counselor Integration</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Responsive Mobile-First Architecture</span></div>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Need A Custom Consultancy Platform?</h2>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase cursor-pointer">
                            <span>Request Consultancy Site</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
