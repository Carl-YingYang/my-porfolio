import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

// ─── Animation Variants (FIXED TYPESCRIPT ERRORS) ─────────────────────────────
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 120, damping: 20 }
    }
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const techStack = [
    { name: "Python", category: "Programming", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", desc: "Powering scalable backend systems, applied AI integrations, and complex automation pipelines." },
    { name: "C#", category: "Programming", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", desc: "Architecting robust, enterprise-grade applications and high-performance system logic." },
    { name: "JavaScript", category: "Programming", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", desc: "Crafting seamless, highly interactive, and dynamic user experiences for the modern web." },
    { name: "React (Vite)", category: "Frameworks", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", desc: "Engineering lightning-fast, component-driven web interfaces with optimized build tooling." },
    { name: "ASP.NET Core", category: "Frameworks", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg", desc: "Designing secure, highly scalable backend architectures and RESTful APIs." },
    { name: "Flutter", category: "Frameworks", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", desc: "Delivering natively compiled, visually rich cross-platform applications for mobile ecosystems." },
    { name: "RAG Arch", category: "AI / Systems", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neo4j/neo4j-original.svg", desc: "Architecting Retrieval-Augmented Generation pipelines for context-aware and highly accurate AI analysis." },
    { name: "OCR", category: "AI / Systems", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg", desc: "Implementing Optical Character Recognition to extract and process structured data from complex documents." },
    { name: "API Integration", category: "AI / Systems", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg", desc: "Seamlessly connecting distinct software services and bridging microservices through secure data exchange." },

    // Updated Category & Logo
    { name: "n8n", category: "Low Code Automation", img: "https://avatars.githubusercontent.com/u/45487711?s=200&v=4", desc: "Orchestrating advanced, node-based workflow automations and complex API communication." },
    { name: "Make.com", category: "Low Code Automation", img: "https://cdn.brandfetch.io/domain/make.com/fallback/lettermark/theme/dark/h/400/w/400/icon?c=1bfwsmEH20zzEfSNTed", desc: "Engineering visual data integrations and robust automation pipelines to streamline business logic." },

    { name: "Vercel", category: "Tools", img: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", desc: "Deploying and hosting high-performance, globally distributed frontend applications." },
    { name: "Hugging Face", category: "Tools", img: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", desc: "Integrating state-of-the-art open-source machine learning models and Natural Language Processing tools." },
    { name: "Git", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", desc: "Maintaining strict version control and ensuring seamless collaborative code management." },
    { name: "Android Studio", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg", desc: "Leveraging native environments for rigorous testing and building of Android mobile applications." },
    { name: "PyCharm", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg", desc: "Utilizing advanced IDE capabilities tailored for deep Python development and AI scripting." }
];

export default function About() {
    const [activeTech, setActiveTech] = useState<any | null>(null);
    const [showAll, setShowAll] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftPos, setScrollLeftPos] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);

    useEffect(() => {
        if (activeTech || showAll) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [activeTech, showAll]);

    // Flawless Auto-Scroll Logic
    useEffect(() => {
        let animationId: number;
        const scroll = () => {
            if (scrollRef.current && !isPaused && !isDragging) {
                const halfWidth = scrollRef.current.scrollWidth / 2;

                scrollRef.current.scrollLeft += 1;

                if (scrollRef.current.scrollLeft >= halfWidth) {
                    scrollRef.current.scrollLeft -= halfWidth;
                } else if (scrollRef.current.scrollLeft <= 0) {
                    scrollRef.current.scrollLeft += halfWidth;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };
        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused, isDragging]);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragDistance(0);
        if (scrollRef.current) {
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeftPos(scrollRef.current.scrollLeft);
        }
    };

    const onMouseLeave = () => {
        setIsDragging(false);
        setIsPaused(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        setDragDistance(Math.abs(walk));
        scrollRef.current.scrollLeft = scrollLeftPos - walk;
    };

    const groupedTech = techStack.reduce((acc, curr) => {
        (acc[curr.category] = acc[curr.category] || []).push(curr);
        return acc;
    }, {} as Record<string, typeof techStack>);

    const renderTechItem = (tech: any, idx: number) => (
        <div
            key={idx}
            onClick={() => {
                if (dragDistance < 5) setActiveTech(tech);
            }}
            className="flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl w-24 h-24 hover:border-red-500/40 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 shadow-sm flex-shrink-0 group pointer-events-auto backdrop-blur-md cursor-pointer"
        >
            <img
                src={tech.img}
                alt={tech.name}
                draggable="false"
                className={`w-9 h-9 object-contain mb-2.5 transition-transform duration-300 group-hover:scale-110 ${tech.name === 'Vercel' || tech.name === 'Make.com' ? 'invert opacity-90' : 'opacity-80 group-hover:opacity-100'} ${tech.name === 'n8n' || tech.name === 'Make.com' ? 'rounded-md' : ''}`}
            />
            <span className="text-[9px] font-bold text-zinc-500 group-hover:text-zinc-300 tracking-wider uppercase text-center leading-tight">
                {tech.name}
            </span>
        </div>
    );

    return (
        <section id="about" className="w-full py-20 relative bg-transparent">
            {/* Ambient Background Glow (Cinematic Red) */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="w-full max-w-5xl mx-auto px-6 relative z-10">

                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight flex items-center gap-4">
                        <span className="text-red-600 font-mono text-lg md:text-xl">01.</span> About Me
                    </h2>
                    <div className="h-0.5 w-12 bg-red-600 mt-3 ml-11"></div>
                </motion.div>

                {/* Staggered Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                >

                    {/* Main Bio Card */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-2xl p-7 md:p-8 shadow-xl flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
                        <div className="w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] select-none group-hover:scale-110 transition-transform duration-500">
                            💻
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-zinc-100 mb-3 tracking-tight">Architect the Future</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-5 font-medium italic border-l-2 border-red-600/50 pl-4">
                            "I build systems that turn complex logic into simple, usable experiences."
                        </p>
                        <p className="text-zinc-400 leading-relaxed text-sm">
                            I'm a 3rd-year Computer Science student focused on building intelligent, real-world applications.
                            I’ve worked on integrating RAG for document analysis, optimizing OCR pipelines, and developing API-driven workflows.
                            I aim to create systems that are not only technically sound, but actually useful in practice.
                        </p>
                    </motion.div>

                    {/* Status & Location Stack */}
                    <div className="flex flex-col gap-4">
                        <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-2xl p-6 flex-1 flex flex-col justify-center group hover:border-red-500/30 transition-colors duration-500 shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-10 h-10 mb-4 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] select-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                                    📍
                                </div>
                                <h3 className="text-base font-bold text-zinc-100 mb-1">Location</h3>
                                <p className="text-xs text-zinc-500">Santa Maria, Bulacan</p>
                                <div className="mt-4 w-fit inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-bold uppercase tracking-widest">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                    </span>
                                    Available for OJT
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-2xl p-6 flex-1 flex flex-col justify-center group hover:border-orange-500/30 transition-colors duration-500 shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-10 h-10 mb-4 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] select-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                    🎓
                                </div>
                                <h3 className="text-base font-bold text-zinc-100 mb-1">Education</h3>
                                <p className="text-xs text-zinc-400">B.S. Computer Science</p>
                                <p className="text-zinc-500 text-[9px] mt-1.5 font-mono uppercase tracking-widest">3rd Year Student</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tech Stack Marquee Container */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-2xl p-7 md:p-8 overflow-hidden relative shadow-xl mt-2 group">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-red-100 transition-colors duration-500">Core Technologies</h3>
                                <p className="text-zinc-500 text-[11px] mt-1">Drag to scroll or tap an icon for details.</p>
                            </div>
                            <button
                                onClick={() => setShowAll(true)}
                                className="flex items-center gap-2 text-[10px] font-bold text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
                            >
                                View Stack
                                <ArrowRight size={14} className="text-red-500" />
                            </button>
                        </div>

                        <div
                            ref={scrollRef}
                            className="relative w-full overflow-x-hidden flex cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] select-none"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={onMouseLeave}
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                            onMouseMove={onMouseMove}
                        >
                            <div className="flex gap-3 pr-3 flex-shrink-0 py-2">
                                {techStack.map((tech, idx) => renderTechItem(tech, idx))}
                            </div>
                            <div className="flex gap-3 pr-3 flex-shrink-0 py-2">
                                {techStack.map((tech, idx) => renderTechItem(tech, idx + 100))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- INDIVIDUAL MODAL --- */}
            <AnimatePresence>
                {activeTech && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveTech(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-sm bg-[#0c0303] border border-white/10 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center z-10"
                        >
                            <button onClick={() => setActiveTech(null)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors active:scale-95">
                                <X size={16} />
                            </button>
                            <div className="relative mb-5 flex justify-center mt-2">
                                <img src={activeTech.img} alt={activeTech.name} className={`relative w-16 h-16 object-contain ${activeTech.name === 'Vercel' || activeTech.name === 'Make.com' ? 'invert' : ''} ${activeTech.name === 'n8n' || activeTech.name === 'Make.com' ? 'rounded-md' : ''}`} />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-500 block mb-2">{activeTech.category}</span>
                            <h3 className="text-2xl font-bold text-white mb-3">{activeTech.name}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm">"{activeTech.desc}"</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- SEE ALL MODAL --- */}
            <AnimatePresence>
                {showAll && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setShowAll(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-4xl max-h-[85vh] bg-[#0c0303] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">Tech Stack</h3>
                                    <p className="text-zinc-500 text-[10px] font-mono uppercase mt-1 tracking-widest">Mastery & Tooling</p>
                                </div>
                                <button onClick={() => setShowAll(false)} className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-zinc-400 hover:text-white transition-all hover:bg-white/10 active:scale-95">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-10 no-scrollbar">
                                {Object.entries(groupedTech).map(([category, items], sectionIdx) => (
                                    <motion.div
                                        key={category}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: sectionIdx * 0.1 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-[0.4em] whitespace-nowrap">{category}</h4>
                                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                                        </div>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                            {items.map((tech, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => { setShowAll(false); setTimeout(() => setActiveTech(tech), 200); }}
                                                    className="flex flex-col items-center justify-center p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-red-600/30 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 group"
                                                >
                                                    <img src={tech.img} alt={tech.name} className={`w-7 h-7 object-contain mb-3 group-hover:scale-110 transition-transform duration-300 ${tech.name === 'Vercel' || tech.name === 'Make.com' ? 'invert opacity-80' : 'opacity-70 group-hover:opacity-100'} ${tech.name === 'n8n' || tech.name === 'Make.com' ? 'rounded-sm' : ''}`} />
                                                    <span className="text-[9px] font-bold text-zinc-500 group-hover:text-zinc-300 tracking-wider uppercase text-center">{tech.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}