import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Compass, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Wonder Delight Travels Digital Platform Case Study | Waadi Media',
    description: 'Wonder Delight Travels booking engine, tour itinerary showcase, 4K Gulmarg video shoots, and lead automation created by Waadi Media.',
    path: '/work/wonder-delight'
});

export default function WonderDelightCaseStudyPage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Wonder Delight Travels", url: "/work/wonder-delight" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                            Kashmir Travel & Tourism Platform
                        </span>
                        <a
                            href="https://wonderdelighttravels.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <span>Visit wonderdelighttravels.com</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Wonder Delight Travels <br />
                        <span className="text-blue-600 dark:text-blue-500">Tour Booking Engine</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        Waadi Media engineered a complete digital platform for Wonder Delight Travels, enabling tourists across India and globally to search Kashmir tour packages, customize trips, book private transport, and reserve verified hotels.
                    </p>
                </div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-video bg-slate-900">
                    <Image src="/wonder-delight-mockup.png" alt="Wonder Delight Travels Platform" fill className="object-cover" />
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Scope & Key Features</h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Curated Kashmir Tour Package Search Engine</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Private Transport & Hotel Booking Modules</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Automated WhatsApp Inquiry Routing</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Mobile-First High Conversion UX</span></div>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Scale Your Kashmir Travel Agency?</h2>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase cursor-pointer">
                            <span>Request Travel Platform</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
