import React from 'react';
import { generateSeoMetadata, generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { MapPin, CheckCircle2, ArrowRight, Code, Cpu, Share2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Web Development & Software Company in Kashmir | Waadi Media',
    description: 'Premier web development, software engineering, and digital agency in Kashmir. Custom Next.js platforms, mobile apps, and social media growth.',
    path: '/locations/kashmir'
});

export default function KashmirLocationPage() {
    const orgSchema = generateOrganizationSchema();
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Locations", url: "/locations/kashmir" },
        { name: "Kashmir Agency", url: "/locations/kashmir" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <MapPin size={14} />
                        <span>Kashmir Regional Hub</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Web & Software Development Company <br />
                        <span className="text-blue-600 dark:text-blue-500">in Kashmir</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        Waadi Media is Kashmir&apos;s leading digital technology powerhouse. We empower Kashmir hotels, retail businesses, cafes, and handicraft exporters with world-class digital assets.
                    </p>
                </div>

                {/* Regional Capabilities */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="ui-card p-6 rounded-2xl space-y-3">
                        <Code className="text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Next.js Web Applications</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">High-speed websites built specifically for Gulmarg resorts, travel agencies, and Kashmir retailers.</p>
                    </div>

                    <div className="ui-card p-6 rounded-2xl space-y-3">
                        <Cpu className="text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Kashmir Software & SaaS</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Custom business POS systems, offline data sync, and enterprise software solutions.</p>
                    </div>

                    <div className="ui-card p-6 rounded-2xl space-y-3">
                        <Share2 className="text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Social Media & Video</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">4K drone production, Instagram growth calendars, and Meta ad campaigns.</p>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Partner With Kashmir&apos;s Premier Tech Agency</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Schedule a strategy meeting with our team in Srinagar.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Start Project In Kashmir</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
