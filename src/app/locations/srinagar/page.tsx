import React from 'react';
import { generateSeoMetadata, generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Software & Web Development Company in Srinagar | Waadi Media',
    description: 'Leading software development, web engineering, and mobile app agency based in Srinagar, Jammu & Kashmir. Custom systems, Next.js apps, and digital growth.',
    path: '/locations/srinagar'
});

export default function SrinagarLocationPage() {
    const orgSchema = generateOrganizationSchema();
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Locations", url: "/locations/srinagar" },
        { name: "Srinagar Agency", url: "/locations/srinagar" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <MapPin size={14} />
                        <span>Srinagar Headquarters</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Software & Web Development <br />
                        <span className="text-blue-600 dark:text-blue-500">Company in Srinagar</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        Headquartered in Srinagar, Waadi Media provides on-ground software development, custom web engineering, and media production services.
                    </p>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Srinagar Services & Local Presence</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "On-Site Consultation & Business Audits in Srinagar",
                            "Srinagar Cafe & Hotel POS Software Setups",
                            "Custom Web Applications & E-Commerce Stores",
                            "On-Location 4K Video & Drone Shoots",
                            "Local SEO & Google Business Profile Ranking",
                            "Direct WhatsApp & Phone Support"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Visit Or Contact Our Srinagar Office</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Let&apos;s build something powerful together.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Book Consultation in Srinagar</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
