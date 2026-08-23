import React from 'react';
import { generateSeoMetadata, generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Digital Marketing & Social Media Agency in Srinagar | Waadi Media',
    description: 'Premier digital marketing, social media growth, and branding agency in Srinagar. Performance Meta/Google ads, Reels production, and online revenue scaling.',
    path: '/locations/srinagar-digital-agency'
});

export default function SrinagarDigitalAgencyPage() {
    const orgSchema = generateOrganizationSchema();
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Locations", url: "/locations/srinagar-digital-agency" },
        { name: "Srinagar Digital Agency", url: "/locations/srinagar-digital-agency" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <MapPin size={14} />
                        <span>Srinagar Growth Agency</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Digital Marketing & Social Media <br />
                        <span className="text-blue-600 dark:text-blue-500">Agency in Srinagar</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        Scale your Srinagar business online with high-converting Instagram Reels, Meta ad campaigns, Google search visibility, and brand authority.
                    </p>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Srinagar Digital Growth Scope</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "Monthly Instagram & YouTube Content Calendars",
                            "On-Location 4K Video & Drone Shoots in Srinagar",
                            "Meta & Google Ad Setup with Direct Lead Routing",
                            "Srinagar Local Business Profile & Map Ranking",
                            "E-Commerce Growth for Pashmina & Handicraft Sellers",
                            "Monthly Growth & Revenue Reporting"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ready To Scale Your Srinagar Brand?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Speak with our Srinagar growth team today.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Request Growth Audit</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
