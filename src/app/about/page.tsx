import React from 'react';
import { generateSeoMetadata, generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Building2, ShieldCheck, Users, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'About Waadi Media | Kashmir Web & Software Development Agency',
    description: 'Learn about Waadi Media, Kashmir’s premier digital marketing, web engineering, mobile app development, and software studio based in Srinagar.',
    path: '/about'
});

export default function AboutPage() {
    const orgSchema = generateOrganizationSchema();
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Building2 size={14} />
                        <span>About Waadi Media</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Kashmir&apos;s Premier Creative & <br />
                        <span className="text-blue-600 dark:text-blue-500">Tech Powerhouse</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        Waadi Media is a Srinagar-based software engineering studio and digital agency. We bridge modern web technologies, mobile apps, business automations, and cinematic media to scale Kashmir brands.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="ui-card p-6 rounded-2xl space-y-3">
                        <Code className="text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Web & Software Engineering</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Building custom Next.js platforms, mobile apps, and enterprise software built for speed and reliability.</p>
                    </div>

                    <div className="ui-card p-6 rounded-2xl space-y-3">
                        <Users className="text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Social Media & Growth</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Managing Instagram, YouTube, and Meta ad campaigns to drive predictable online revenues.</p>
                    </div>

                    <div className="ui-card p-6 rounded-2xl space-y-3">
                        <ShieldCheck className="text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Regional E-E-A-T Trust</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Headquartered in Srinagar with deep Kashmir market expertise and transparent execution.</p>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ready To Partner With Us?</h2>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase cursor-pointer">
                            <span>Get In Touch</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
