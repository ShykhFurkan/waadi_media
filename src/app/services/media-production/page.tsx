import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Video, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Media & Drone Video Production in Kashmir | 4K Shoots',
    description: 'Premier media & video production company in Srinagar & Kashmir. 4K camera shoots, drone videography, commercial photography, and brand storytelling.',
    path: '/services/media-production'
});

export default function MediaProductionPage() {
    const serviceSchema = generateServiceSchema({
        name: "Media & Drone Video Production in Kashmir",
        description: "4K video shoots, FPV drone videography, commercial photography, and Reel creation for Gulmarg resorts & Kashmir brands.",
        path: "/services/media-production"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Media Production", url: "/services/media-production" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Video size={14} />
                        <span>Kashmir Media Production Leader</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Media & Drone Video Production <br />
                        <span className="text-blue-600 dark:text-blue-500">in Kashmir</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We capture cinematic 4K video, FPV drone footage, and studio photography that highlight the luxury and scale of your brand.
                    </p>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Production Deliverables</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "4K Cinema Camera On-Location Video Shoots",
                            "FPV & Aerial Drone Videography in Gulmarg & Srinagar",
                            "High-Retention Reels, Shorts & TikTok Creation",
                            "Studio Commercial Product Photography",
                            "Professional Color Grading & Sound Design",
                            "Brand Story Documentaries & Ad Commercials"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Need Cinematic Media For Your Brand?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Book a shoot date with our media team in Srinagar.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Book Video Shoot</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
