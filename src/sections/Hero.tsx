import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import profileImg from '../assets/pfp/Profile.png';

// ─── Animation Variants (FIXED TYPESCRIPT ERRORS) ─────────────────────────────
const customEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: customEase, delay },
});

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
});

// ─── Sub-components ───────────────────────────────────────────────────────────
function SkillPill({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/80 text-[10px] font-bold text-zinc-400 tracking-widest uppercase hover:border-red-500/60 hover:text-red-400 transition-colors duration-300 whitespace-nowrap shadow-sm">
            {label}
        </span>
    );
}

function RotatingBadge() {
    return (
        <motion.a
            {...fadeIn(1.1)}
            href="#contact"
            aria-label="Open for OJT — Hire me now"
            className="group relative flex items-center justify-center w-28 h-28 flex-shrink-0"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="absolute inset-0"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                        id="badgeCircle"
                        d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                        fill="transparent"
                    />
                    <text className="text-[8.5px] font-black uppercase tracking-[0.22em] fill-zinc-500 group-hover:fill-red-500 transition-colors duration-300">
                        <textPath href="#badgeCircle" startOffset="0%">
                            • Open for OJT • Hire me now •
                        </textPath>
                    </text>
                </svg>
            </motion.div>
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-500 group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                <ArrowUpRight size={20} />
            </div>
        </motion.a>
    );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
    const skills = ['Python / Local AI', 'RAG Architecture', 'React Native', 'Vite & Tailwind', 'OCR Integration'];

    return (
        <section
            id="home"
            // Pinalitan natin ang bg-[#080808] to bg-transparent para makita yung Red Orbs mula sa App.tsx
            className="relative w-full min-h-[100dvh] bg-transparent overflow-hidden flex flex-col font-sans"
        >
            {/* ── Subtle grid texture ─────────────────────────────────────────── */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* ── Glow accents (Updated to Crimson Red) ─────────────────────── */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full z-0"
                style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 65%)' }}
            />

            {/* ═══════════════════════════════════════════════════════════════════
                LAYER 0: TOP CENTERED "BUILD SMARTER" TEXT
            ═══════════════════════════════════════════════════════════════════ */}
            <div className="absolute top-[8%] lg:top-[12%] w-full flex justify-center z-0 select-none pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: customEase, delay: 0.1 }}
                    className="text-[18vw] sm:text-[15vw] lg:text-[11.5vw] font-black uppercase leading-[0.85] tracking-tighter text-white text-center drop-shadow-md"
                    style={{ letterSpacing: '-0.04em' }}
                >
                    BUILD <br className="lg:hidden" /> SMARTER.
                </motion.h1>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                LAYER 10: MAIN LAYOUT (Three-column grid on desktop)
            ═══════════════════════════════════════════════════════════════════ */}
            <div className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-12 lg:pb-16 flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-0 items-end justify-end mt-[25vh] lg:mt-[30vh]">

                {/* ── LEFT COLUMN — Bio + Skills ─────────────────────────── */}
                <div className="flex flex-col justify-end w-full pb-0 lg:pb-10 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">

                    <motion.p
                        {...fadeUp(0.15)}
                        // Updated to Deep Red accent
                        className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-4"
                    >
                        Hi there, I'm Carl
                    </motion.p>

                    <motion.p
                        {...fadeUp(0.3)}
                        className="text-[13px] lg:text-sm text-zinc-400 leading-relaxed max-w-sm mb-8"
                    >
                        Aspiring AI-focused Full-Stack Developer with hands-on experience building web applications integrated with AI features such as RAG and OCR. Seeking an OJT opportunity to apply and further develop software development and applied AI skills.
                    </motion.p>

                    <motion.div
                        {...fadeUp(0.4)}
                        className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10 max-w-[350px]"
                    >
                        {skills.map((s) => <SkillPill key={s} label={s} />)}
                    </motion.div>

                    <motion.div {...fadeUp(0.5)} className="flex items-center gap-5">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-7 py-3.5 rounded-full hover:bg-zinc-200 active:scale-95 transition-all duration-200 shadow-[0_0_24px_rgba(255,255,255,0.15)]"
                        >
                            View My Work <ArrowUpRight size={16} />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors duration-200"
                        >
                            Get in touch <ArrowUpRight size={15} />
                        </a>
                    </motion.div>
                </div>

                {/* ── CENTER COLUMN — Portrait ────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: customEase, delay: 0.2 }}
                    className="order-1 lg:order-2 flex justify-center items-end self-end w-full"
                >
                    <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] mx-auto flex flex-col justify-end">

                        {/* Base Glassmorphism card behind portrait */}
                        <div className="absolute bottom-0 left-[5%] right-[5%] h-[75%] bg-zinc-900/40 border border-zinc-800/60 rounded-t-[2.5rem] backdrop-blur-md shadow-2xl" />

                        {/* Subtle line accent - Updated to Vintage Red */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />

                        {/* PFP With Heavy Drop Shadow overlapping the text */}
                        <img
                            src={profileImg}
                            alt="Carl Micky Nieva"
                            className="relative z-10 w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] pointer-events-none select-none scale-105"
                        />
                    </div>
                </motion.div>

                {/* ── RIGHT COLUMN — Stats + Badge ────────────────────────── */}
                <div className="flex flex-col justify-end items-center lg:items-end w-full pb-0 lg:pb-10 order-3 gap-10 mt-8 lg:mt-0">

                    <motion.div {...fadeUp(0.35)} className="grid grid-cols-2 gap-3 w-full max-w-[280px] lg:max-w-[240px] lg:ml-auto">
                        {[
                            { value: 'AI', label: 'RAG & OCR' },
                            { value: 'OJT', label: 'Ready Now' },
                            { value: 'FS', label: 'Full-Stack' },
                        ].map(({ value, label }) => (
                            <div
                                key={label}
                                className="flex flex-col items-center justify-center aspect-square rounded-[1.25rem] border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-md p-3 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
                            >
                                <span className="text-2xl font-black text-white tracking-tighter">{value}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1 text-center">{label}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div {...fadeIn(0.8)}>
                        <RotatingBadge />
                    </motion.div>

                    {/* Availability indicator */}
                    <motion.div {...fadeIn(0.9)} className="flex items-center gap-2 mt-[-10px]">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Available for OJT</span>
                    </motion.div>

                </div>
            </div>

        </section>
    );
}