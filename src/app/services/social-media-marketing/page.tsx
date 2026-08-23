import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from '@/lib/seo';
import { Share2, CheckCircle2, ArrowRight, Video, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Social Media Marketing Agency in Srinagar & Kashmir | Growth Strategy',
    description: 'Premier social media marketing agency in Srinagar & Kashmir. We build brand authority, produce viral Reels & 4K video content, and manage Instagram & YouTube growth.',
    path: '/services/social-media-marketing'
});

const faqs = [
    { q: "Which social media platforms do you manage for Kashmir businesses?", a: "We manage Instagram, YouTube, Facebook, and LinkedIn, creating platform-native content calendars, short-form Reels, and video campaigns." },
    { q: "Do you produce 4K video and Reels content locally in Srinagar & Kashmir?", a: "Yes! Our media production team conducts on-location 4K camera shoots, drone videography, and professional editing for Gulmarg resorts, Srinagar cafes, and Kashmir brands." }
];

export default function SocialMediaMarketingPage() {
    const serviceSchema = generateServiceSchema({
        name: "Social Media Marketing Agency in Kashmir",
        description: "Professional social media management, Instagram Reels production, and brand growth strategy for Kashmir businesses.",
        path: "/services/social-media-marketing"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Social Media Marketing", url: "/services/social-media-marketing" }
    ]);

    const faqSchema = generateFaqSchema(faqs);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">

                {/* Hero */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Share2 size={14} />
                        <span>Kashmir Social Media Growth Leader</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Social Media Marketing Agency <br />
                        <span className="text-blue-600 dark:text-blue-500">in Srinagar & Kashmir</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We build brand authority across Instagram, YouTube, and LinkedIn through structured content calendars, 4K video shoots, and targeted audience growth.
                    </p>
                </div>

                {/* Scope */}
                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Social Media Management Deliverables</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "Monthly Content Publishing Calendars",
                            "On-Location 4K Video & Drone Shoots in Kashmir",
                            "High-Retention Instagram Reels & Shorts Editing",
                            "Copywriting, Captions & Hashtag Strategy",
                            "Community Engagement & DM Management",
                            "Monthly Growth Analytics & Reach Velocity Reports"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="ui-card p-6 rounded-2xl space-y-2">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{faq.q}</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ready To Command Social Authority?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Book a social strategy call with our media team in Srinagar.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Request Social Media Proposal</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
