'use client';
import React from 'react';
import {
    Search, Compass, Zap, BarChart3, Star,
    CheckCircle2, Sparkles, MessageSquare,
    Clock, ThumbsUp, ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';

const MethodPage = () => {
    const colors = {
        teal: '#3F9AAE',
        lightTeal: '#79C9C5',
        beige: '#FFE2AF',
        red: '#F96E5B',
        darkTeal: '#2D6E7D'
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { type: "spring" as const, damping: 12, stiffness: 100 }
    };

    const methodStages = [
        {
            step: "01",
            title: "Study",
            subtitle: "Understanding the Business Before Touching the Screen",
            icon: <Search size={40} />,
            color: colors.teal,
            description: "Every strong outcome begins with proper understanding. Before design, content, or advertising, we study the fundamentals of your business. We avoid assumptions and work from facts.",
            analyzePoints: [
                "Business model, services, and revenue drivers",
                "Target audience & decision-making behavior",
                "Current online presence (web, social, listings)",
                "Local and digital competitor benchmarking",
                "Operational challenges slowing you down"
            ],
            whyItMatters: "Most businesses fail online because they copy trends without understanding their own position. We ensure absolute clarity before execution.",
            outcome: "Identification of gaps, opportunities, and a grounded foundation for every decision."
        },
        {
            step: "02",
            title: "Strategize",
            subtitle: "Designing the System, Not Just the Look",
            icon: <Compass size={40} />,
            color: colors.red,
            description: "Once the study is complete, we translate insights into a structured digital plan. This is where direction is established. No generic packages—just strategy tailored to your scale.",
            analyzePoints: [
                "Brand positioning and messaging",
                "Platform prioritization (what actually matters)",
                "The website’s specific role (conversion vs authority)",
                "Content direction and posting structure",
                "Automation opportunities to reduce manual work"
            ],
            howWeWork: "No unnecessary features. Only strategy tailored to your growth stage and market position.",
            outcome: "A clear roadmap where effort and budget are used with intent and alignment."
        },
        {
            step: "03",
            title: "Build",
            subtitle: "Execution With Technical and Creative Depth",
            icon: <Zap size={40} />,
            color: colors.lightTeal,
            description: "This is where planning becomes reality. Our build phase focuses on quality, performance, and long-term usability. We value performance over visual gimmicks.",
            analyzePoints: [
                "Fast, responsive, SEO-ready websites",
                "Smart lead handling and workflow automations",
                "Strategy-aligned videos, photography, and copy",
                "Structured social media calendar systems",
                "Properly tracked and optimized ad campaigns"
            ],
            standards: "Clean design, not clutter. Systems that are easy for you to manage after delivery.",
            outcome: "A working digital ecosystem that reflects credibility and supports business operations."
        },
        {
            step: "04",
            title: "Iterate",
            subtitle: "Refinement Based on Real Data, Not Opinions",
            icon: <BarChart3 size={40} />,
            color: colors.teal,
            description: "Digital work is never static. Once systems are live, we observe, refine, and improve. We scale what works and remove what doesn’t.",
            analyzePoints: [
                "Website performance and user behavior",
                "Content engagement and audience response",
                "Lead quality and conversion patterns",
                "Ad performance and cost efficiency",
                "Continuous messaging optimization"
            ],
            howWeImprove: "Better results over time without rebuilding everything. Adjusting formats based on patterns.",
            outcome: "Continuous improvement and a digital presence that grows with your business."
        }
    ];

    return (
        <div className="bg-[#FFE2AF] min-h-screen font-sans text-[#2D6E7D] pb-24">
            {/* Header Section */}
            <section className="pt-32 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                        <motion.div
                            whileHover={{ rotate: 0, scale: 1.05 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-[#F96E5B] bg-white mb-8 -rotate-3 cursor-default shadow-sm"
                        >
                            <Sparkles size={16} className="text-[#F96E5B]" />
                            <span className="text-xs font-black uppercase tracking-widest text-[#F96E5B]">Disciplined Execution</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 text-[#3F9AAE]">
                            The Waadi <br /> <span className="text-[#F96E5B]">Method</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold italic opacity-80 max-w-3xl mx-auto leading-relaxed">
                            A disciplined, proven process that blends strategy, creativity, and technology to deliver real business outcomes—<span className="underline decoration-[#F96E5B] decoration-4">not guesswork.</span>
                        </p>
                    </motion.div>
                </div>
            </section>
            <section>
                <div>
                    
                </div>  
            </section>
            {/* Methodology Stages */}
            <section className="py-12 space-y-24">
                {methodStages.map((stage, idx) => (
                    <div key={stage.step} className="max-w-6xl mx-auto px-6">
                        <motion.div
                            {...fadeInUp}
                            className="bg-white p-8 md:p-16 rounded-[60px] border-4 border-[#3F9AAE] shadow-[16px_16px_0px_0px_#3F9AAE] relative overflow-hidden"
                        >
                            <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
                                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="flex items-center space-x-6 mb-8">
                                        <div className="text-6xl md:text-8xl font-black italic opacity-10 text-[#2D6E7D] select-none">
                                            {stage.step}
                                        </div>
                                        <div>
                                            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-[#3F9AAE]">{stage.title}</h2>
                                            <p className="font-bold text-[#F96E5B] uppercase tracking-widest text-xs mt-1">{stage.subtitle}</p>
                                        </div>
                                    </div>

                                    <p className="text-lg font-medium mb-10 leading-relaxed italic border-l-8 pl-6" style={{ borderColor: stage.color }}>
                                        {stage.description}
                                    </p>

                                    <div className="space-y-6 mb-10">
                                        <h4 className="font-black uppercase text-xs tracking-[0.3em] opacity-40">What we analyze & execute</h4>
                                        <div className="grid gap-4">
                                            {stage.analyzePoints.map((point, i) => (
                                                <div key={i} className="flex items-center space-x-3 group">
                                                    <Star size={16} className="text-[#F96E5B] fill-current group-hover:rotate-45 transition-transform" />
                                                    <span className="font-bold text-sm uppercase tracking-tight">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 bg-[#FFE2AF]/20 rounded-[30px] border-4 border-dotted border-[#3F9AAE]">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <Sparkles size={18} className="text-[#F96E5B]" />
                                            <h5 className="font-black uppercase text-xs tracking-widest text-[#3F9AAE]">Outcome of this phase</h5>
                                        </div>
                                        <p className="text-xl font-black italic tracking-tight">{stage.outcome}</p>
                                    </div>
                                </div>

                                <div className={`flex flex-col justify-center h-full ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                                        className="aspect-square w-full max-w-[350px] mx-auto rounded-[60px] border-4 border-[#3F9AAE] flex flex-col items-center justify-center bg-white shadow-xl relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: stage.color }}></div>
                                        <div className="p-8 rounded-full mb-6 transition-transform group-hover:scale-110 duration-500" style={{ backgroundColor: stage.color + '15', color: stage.color }}>
                                            {stage.icon}
                                        </div>
                                        <div className="text-center px-8">
                                            <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-2 italic">Phase Execution</p>
                                            <p className="text-xl font-black uppercase italic leading-tight">Waadi Standard Process</p>
                                        </div>
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-5" style={{ backgroundColor: stage.color }}></div>
                                    </motion.div>

                                    <div className="mt-12 p-6 rounded-2xl bg-slate-50 border-2 border-[#3F9AAE]/10 italic font-medium text-sm text-center">
                                        "{stage.whyItMatters || stage.howWeWork || stage.standards || stage.howWeImprove}"
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </section>

            {/* Principle Summary Section */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        {...fadeInUp}
                        className="bg-[#3F9AAE] p-12 md:p-20 rounded-[80px] text-white shadow-[0_20px_0_0_#2D6E7D] text-center relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-5xl font-black uppercase italic mb-12 tracking-tighter leading-none">
                                How We Work With You
                            </h3>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                                {[
                                    { t: "Clear communication", i: <MessageSquare /> },
                                    { t: "Structured timelines", i: <Clock /> },
                                    { t: "Honest recommendations", i: <ThumbsUp /> },
                                    { t: "No unnecessary complexity", i: <ShieldAlert /> }
                                ].map((principle, i) => (
                                    <motion.div
                                        key={i} whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                        className="p-6 rounded-3xl border-2 border-white/20 flex flex-col items-center space-y-4"
                                    >
                                        <div className="text-white opacity-80">{principle.i}</div>
                                        <p className="font-black uppercase text-[10px] tracking-[0.2em]">{principle.t}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="h-px w-24 bg-white/30 mx-auto mb-12"></div>

                            <p className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6">
                                Study first. Build with purpose. <br />
                                <span className="text-[#FFE2AF]">Improve through discipline.</span>
                            </p>

                            <p className="text-lg font-bold uppercase tracking-widest italic opacity-80">
                                The Waadi Method: Steady growth, not random hacks.
                            </p>
                        </div>

                        {/* Background Decorative Sparkles */}
                        <Sparkles className="absolute top-10 left-10 opacity-10 w-24 h-24 rotate-12" />
                        <Sparkles className="absolute bottom-10 right-10 opacity-10 w-32 h-32 -rotate-12" />
                    </motion.div>
                </div>
            </section>

            {/* Bottom One-Liner */}
            <div className="text-center px-6">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="inline-block p-4 border-b-4 border-[#F96E5B] italic font-black uppercase tracking-tighter text-xl"
                >
                    Growth is earned through systems, not improvised.
                </motion.div>
            </div>
        </div>
    );
};

export default MethodPage;
