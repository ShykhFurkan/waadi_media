import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Cpu, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Smart Hire AI Recruitment Platform Case Study | Waadi Media',
    description: 'Next-generation AI recruitment and assessment prototype built by Waadi Media, unifying AI ATS resume screening, MCQ tests, Monaco IDE coding challenges, and AI evaluations.',
    path: '/work/smart-hire'
});

export default function SmartHireCaseStudyPage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Smart Hire AI Platform", url: "/work/smart-hire" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                            AI Recruitment Software Prototype
                        </span>
                        <a
                            href="https://smarthire-beige.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            <span>Visit smarthire-beige.vercel.app</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Smart Hire: Next-Gen AI <br />
                        <span className="text-blue-600 dark:text-blue-500">Recruitment & Assessment Platform</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        Waadi Media prototyped Smart Hire, an all-in-one hiring system unifying AI ATS resume parsing, candidate skill screening, live Monaco IDE coding challenges, and AI interview scoring.
                    </p>
                </div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-video bg-slate-900">
                    <Image src="/smart-hire-mockup.png" alt="Smart Hire AI Platform" fill className="object-cover" />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">94.2%</div>
                        <div className="text-xs text-slate-500">ATS Match Rate Precision</div>
                    </div>
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">Monaco IDE</div>
                        <div className="text-xs text-slate-500">Live Coding Challenges</div>
                    </div>
                    <div className="ui-card p-5 rounded-2xl text-center space-y-1">
                        <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">AI Scoring</div>
                        <div className="text-xs text-slate-500">Automated Candidate Ranking</div>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Architecture & Modules</h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>AI ATS Resume Parser & Keyword Extractor</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Monaco IDE Live Coding Evaluation Engine</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Interactive MCQ Skill Assessment Console</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Talent Pipeline Console Dashboard</span></div>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Building An AI-Powered Software Platform?</h2>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase cursor-pointer">
                            <span>Discuss AI Software Build</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
