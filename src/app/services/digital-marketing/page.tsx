import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Megaphone, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Digital Marketing & Performance Ads Agency in Kashmir | Meta & Google',
    description: 'Premier digital marketing agency in Srinagar & Kashmir. Data-driven Meta & Google ad campaigns, conversion funnels, and ROI marketing for local businesses.',
    path: '/services/digital-marketing'
});

export default function DigitalMarketingPage() {
    const serviceSchema = generateServiceSchema({
        name: "Digital Marketing & Performance Ads in Kashmir",
        description: "Meta and Google advertising campaigns, conversion rate optimization, and ROI performance marketing.",
        path: "/services/digital-marketing"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Digital Marketing", url: "/services/digital-marketing" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Megaphone size={14} />
                        <span>Kashmir Performance Ads Leader</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Digital Marketing Agency <br />
                        <span className="text-blue-600 dark:text-blue-500">in Kashmir & Srinagar</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We run high-converting Meta and Google ad campaigns treated as strict financial investments to generate qualified leads and high-margin sales.
                    </p>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Digital Marketing Scope</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "Meta (Instagram & Facebook) Targeted Ad Campaigns",
                            "Google Search & Performance Max Search Ads",
                            "Ad Copywriting & Creative Variant Testing",
                            "Conversion Funnel & Landing Page Optimization",
                            "Retargeting Campaigns for Hotel Bookings & Sales",
                            "Transparent Weekly CPA & ROAS Reporting"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ready For Measurable Paid ROI?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Request a campaign audit from our growth marketers.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Request Campaign Audit</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
