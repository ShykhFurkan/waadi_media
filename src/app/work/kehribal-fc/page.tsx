import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Trophy, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, Share2, Users, Megaphone, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Kehribal FC Kashmir Case Study | 100k+ Impressions & Profile Growth',
    description: 'Waadi Media is the Official Media & Management Partner of Kehribal FC (Est. 2016). Brand building, digital growth, team management, sponsor PR, and media coverage achieving 100k+ monthly impressions.',
    path: '/work/kehribal-fc'
});

export default function KehribalFcCaseStudyPage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Kehribal FC Kashmir", url: "/work/kehribal-fc" }
    ]);

    const pillars = [
        {
            title: "Brand Building",
            desc: "Building a strong visual identity, crest positioning, and high visibility for Kehribal FC across Kashmir and regional media.",
            icon: <ShieldCheck className="text-blue-600 dark:text-blue-400" />
        },
        {
            title: "Digital Growth",
            desc: "Managing Instagram (@kehribal_fc), viral 4K video content, caption strategy, and community engagement to drive fan growth.",
            icon: <Share2 className="text-blue-600 dark:text-blue-400" />
        },
        {
            title: "Team Management",
            desc: "Streamlining team operations, match fixture schedules, player announcements, and matchday logistics.",
            icon: <Users className="text-blue-600 dark:text-blue-400" />
        },
        {
            title: "Sponsor & PR",
            desc: "Connecting with sponsors and securing partnerships (Elite Rouf Ahmad Sheikh, Waadi Media, Best One ECC, 1/2 Million Paints).",
            icon: <Megaphone className="text-blue-600 dark:text-blue-400" />
        },
        {
            title: "Media Coverage",
            desc: "Capturing 4K aerial drone highlights, graphic designs, match coverage, and player spotlight interviews.",
            icon: <Video className="text-blue-600 dark:text-blue-400" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                            Official Media & Management Partner
                        </span>
                        <a
                            href="https://www.instagram.com/kehribal_fc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <span>@kehribal_fc Instagram</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Partnering for Growth <br />
                        <span className="text-blue-600 dark:text-blue-500">On & Off The Pitch</span>
                    </h1>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        Waadi Media is proud to work with Kehribal FC (Est. 2016) in building a strong brand, streamlining team management, securing sponsor partnerships, and driving long-term digital growth.
                    </p>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-video bg-slate-950">
                    <Image src="/kehribal-fc-showcase.jpg" alt="Kehribal FC Kashmir Partner Showcase" fill className="object-cover" />
                </div>

                {/* Key Metrics */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">100,000+</div>
                        <div className="text-xs text-slate-500">Monthly Reach & Profile Visits</div>
                    </div>
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">Est. 2016</div>
                        <div className="text-xs text-slate-500">Kashmir Football Legacy</div>
                    </div>
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">Full Suite</div>
                        <div className="text-xs text-slate-500">Media, PR & Operations</div>
                    </div>
                </div>

                {/* 5 Work Pillars */}
                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our 5 Pillars of Work for Kehribal FC</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Comprehensive management and digital acceleration on and off the field.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pillars.map((p, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 w-fit">{p.icon}</div>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{p.title}</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quote Card */}
                <div className="ui-card rounded-3xl p-8 border border-blue-200 dark:border-blue-900/50 bg-gradient-to-r from-blue-50/60 via-white to-slate-50 dark:from-blue-950/30 dark:via-[#090D16] dark:to-[#030712] space-y-4">
                    <blockquote className="text-base sm:text-lg font-bold text-slate-900 dark:text-white italic">
                        &quot;Together, we&apos;re building more than a football club – we&apos;re building a legacy.&quot;
                    </blockquote>
                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 dark:border-white/10 pt-4">
                        <span className="font-bold text-blue-600 dark:text-blue-400">Waadi Media</span>
                        <span>Official Media & Management Partner of Kehribal FC</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Build Brand Authority & Legacy For Your Team?</h2>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase cursor-pointer">
                            <span>Request Growth & Operations Strategy</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
