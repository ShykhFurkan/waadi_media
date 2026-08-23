'use client';
import React from 'react';
import { Search, Compass, Zap, BarChart3, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const methodStages = [
    {
        step: "01",
        title: "Study & Audit",
        subtitle: "Understanding Business Fundamentals Before Writing Code",
        icon: <Search size={24} className="text-blue-600 dark:text-blue-400" />,
        description: "We analyze your core business model, target audience in Kashmir/India, existing digital presence, and revenue bottlenecks.",
        analyzePoints: [
            "Business model & core revenue drivers",
            "Target audience decision behavior",
            "Current web & social presence audit",
            "Regional competitor benchmarking"
        ],
        outcome: "Identification of growth gaps and clear strategic foundation."
    },
    {
        step: "02",
        title: "Strategize",
        subtitle: "Designing Systems, Not Just Pretty Templates",
        icon: <Compass size={24} className="text-blue-600 dark:text-blue-400" />,
        description: "Translating audit insights into a structured digital roadmap. We prioritize high-yield platforms and outline specific technical & content deliverables.",
        analyzePoints: [
            "Brand positioning & messaging framework",
            "Website conversion architecture",
            "Content creation calendar blueprint",
            "Workflow automation opportunities"
        ],
        outcome: "A clear execution blueprint with transparent milestones."
    },
    {
        step: "03",
        title: "Build",
        subtitle: "Technical Engineering & Media Production",
        icon: <Zap size={24} className="text-blue-600 dark:text-blue-400" />,
        description: "Where design and engineering come alive. We build custom Next.js web applications, scalable cloud software, and produce 4K media.",
        analyzePoints: [
            "Fast Next.js web apps (<0.8s load time)",
            "WhatsApp & CRM automation triggers",
            "4K drone & short-form video production",
            "Meta & Google Ad funnel setup"
        ],
        outcome: "A working digital ecosystem supporting business operations."
    },
    {
        step: "04",
        title: "Iterate",
        subtitle: "Data-Driven Continuous Optimization",
        icon: <BarChart3 size={24} className="text-blue-600 dark:text-blue-400" />,
        description: "Post-launch, we monitor user behavior analytics, ad conversion costs, and lead velocity. We scale winning channels.",
        analyzePoints: [
            "Website user conversion heatmaps",
            "Ad creative A/B testing & cost reduction",
            "Social media retention & reach velocity",
            "Continuous system performance reviews"
        ],
        outcome: "Sustained business growth and expanding market share."
    }
];

const MethodPage = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} />
                        <span>Execution Architecture</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        The Waadi <span className="text-blue-600 dark:text-blue-500">Method</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                        A disciplined process blending strategic audit, creative direction, and software engineering—not random growth hacks.
                    </p>
                </div>

                {/* Stages Timeline */}
                <div className="space-y-8">
                    {methodStages.map((stage) => (
                        <div key={stage.step} className="ui-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 relative">
                            <div className="grid lg:grid-cols-12 gap-8 items-start">
                                
                                <div className="lg:col-span-4 space-y-3">
                                    <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-500">{stage.step}</div>
                                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 w-fit">
                                        {stage.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{stage.title}</h2>
                                    <div className="text-xs uppercase font-extrabold text-blue-600 dark:text-blue-400">{stage.subtitle}</div>
                                </div>

                                <div className="lg:col-span-8 space-y-4">
                                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed border-l-2 border-blue-600 dark:border-blue-500 pl-3 italic">
                                        &quot;{stage.description}&quot;
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-2 pt-2">
                                        {stage.analyzePoints.map((point, i) => (
                                            <div key={i} className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                                <span>{point}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-400">Phase Outcome:</span>
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">{stage.outcome}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Callout */}
                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Study First. Build With Purpose. Improve Through Discipline.
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs max-w-md mx-auto">
                        Growth is earned through systems, not improvised hacks.
                    </p>
                    <Link href="/lets-talk" passHref>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer"
                        >
                            <span>Apply The Method To Your Brand</span>
                            <ArrowRight size={14} />
                        </motion.div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default MethodPage;
