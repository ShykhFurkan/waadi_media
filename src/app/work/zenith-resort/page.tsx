import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'The Zenith Luxury Resort Gulmarg Case Study | Waadi Media',
    description: 'Ultra-luxury resort web application, direct booking engine, and winter snow adventure portal engineered by Waadi Media.',
    path: '/work/zenith-resort'
});

export default function ZenithResortCaseStudyPage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "The Zenith Resort Gulmarg", url: "/work/zenith-resort" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                        Hospitality & Resort Web Engineering
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        The Zenith Luxury Resort <br />
                        <span className="text-blue-600 dark:text-blue-500">Gulmarg Platform</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        Engineering an ultra-luxury Next.js web application featuring direct room availability widgets, multi-currency payments, and winter adventure bookings.
                    </p>
                </div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-video bg-slate-900">
                    <Image src="/resort-mockup.jpg" alt="Zenith Resort Gulmarg" fill className="object-cover" />
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Measured Business Impact</h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>+340% Direct Booking Revenue</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Zero OTA Commission Fees</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>4K Aerial Snow Drone Production</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Razorpay & Stripe International Checkout</span></div>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Own A Hotel Or Resort In Kashmir?</h2>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase cursor-pointer">
                            <span>Request Resort Build</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
