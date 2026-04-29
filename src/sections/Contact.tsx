import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import resumePdf from '../assets/resume/My-Resume.pdf';
import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Social = {
    name: string;
    username: string;
    link: string;
    icon: React.ReactNode;
};

// ─── Social Data ──────────────────────────────────────────────────────────────

const socials: Social[] = [
    {
        name: 'LinkedIn',
        username: 'Carl Micky Nieva',
        link: 'https://www.linkedin.com/in/carl-micky-nieva-6999172b8/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        username: '@Carl-YingYang',
        link: 'https://github.com/Carl-YingYang',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'TikTok',
        username: '@carlmickynieva',
        link: 'https://www.tiktok.com/@carlmickynieva?is_from_webapp=1&sender_device=pc',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.37-3.4-5.74.06-2.06 1.12-4.04 2.82-5.16 1.73-1.14 3.96-1.39 5.92-.76.11.04.22.08.33.13v4.13c-.66-.23-1.36-.31-2.06-.23-.81.08-1.57.49-2.08 1.12-.55.72-.73 1.73-.41 2.59.34.87 1.18 1.54 2.11 1.72 1.25.21 2.6-.2 3.32-1.25.4-.56.62-1.24.64-1.92.05-3.8.02-7.61.04-11.41.01-2.07-.02-4.14.02-6.21z" />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        username: 'Carl Micky Nieva',
        link: 'https://www.facebook.com/carlmicky.nieva.9',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
];

// ─── Animation presets ────────────────────────────────────────────────────────
const customEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: customEase, delay },
});

// ─── SocialRow ────────────────────────────────────────────────────────────────

function SocialRow({ social, index }: { social: Social; index: number }) {
    return (
        <motion.a
            {...fadeUp(0.35 + index * 0.07)}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between py-5 border-b border-zinc-800/70 hover:border-zinc-600/70 transition-colors duration-300"
        >
            <div className="flex items-center gap-6">
                <span className="text-[11px] font-mono text-zinc-700 w-6 select-none">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-3.5">
                    <span className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-all duration-300 shrink-0">
                        {social.icon}
                    </span>
                    <div>
                        <p className="text-[15px] font-bold text-zinc-300 group-hover:text-white transition-colors duration-300 leading-none mb-1">
                            {social.name}
                        </p>
                        <p className="text-[11px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                            {social.username}
                        </p>
                    </div>
                </div>
            </div>

            <ArrowUpRight
                size={18}
                className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            />
        </motion.a>
    );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export default function Contact() {
    return (
        <section
            id="contact"
            // Changed to transparent to let the Cinematic Red Orbs show through
            className="w-full py-24 relative bg-transparent overflow-hidden"
        >
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] pointer-events-none"
                style={{
                    // Changed from blue accent to cinematic red
                    background: 'radial-gradient(ellipse, rgba(220,38,38,0.08) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6">

                {/* ── Section header ───────────────────────────────────────── */}
                <motion.div {...fadeUp(0)} className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        {/* Changed text-blue-500 to text-red-600 */}
                        <span className="text-[18px] font-mono font-bold text-red-600 tracking-[0.25em] uppercase">
                            03. Contact
                        </span>
                        <div className="h-px flex-1 bg-zinc-800/80" />
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9] mb-6">
                        Let's work<br />
                        <span className="text-zinc-600">together.</span>
                    </h2>

                    <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
                        Actively seeking{' '}
                        <span className="text-zinc-300 font-semibold">OJT opportunities</span>.
                        Open to collaborations, inquiries, or a good conversation about AI and software.
                    </p>
                </motion.div>

                {/* ── Primary CTAs — email + resume ─────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">

                    <motion.a
                        {...fadeUp(0.12)}
                        href="mailto:carlmickynieva@gmail.com"
                        className="group relative flex items-center justify-between p-7 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 overflow-hidden"
                    >
                        {/* Hover glow - Changed to Red */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: 'radial-gradient(circle at 20% 50%, rgba(220,38,38,0.08) 0%, transparent 60%)' }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                {/* Icon box - Changed to Red */}
                                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <Mail size={16} className="text-red-500" />
                                </div>
                                <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.2em]">
                                    Direct Email
                                </span>
                            </div>
                            <p className="text-[15px] font-bold text-zinc-200 group-hover:text-white transition-colors tracking-tight">
                                carlmickynieva@gmail.com
                            </p>
                            <p className="text-[11px] text-zinc-600 mt-1 group-hover:text-zinc-400 transition-colors">
                                Best way to reach me
                            </p>
                        </div>

                        <ArrowUpRight
                            size={20}
                            className="relative z-10 text-zinc-700 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0"
                        />
                    </motion.a>

                    <motion.a
                        {...fadeUp(0.18)}
                        href={resumePdf}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-between p-7 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ background: 'radial-gradient(circle at 20% 50%, rgba(34,197,94,0.06) 0%, transparent 60%)' }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                    <FileText size={16} className="text-green-400" />
                                </div>
                                <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.2em]">
                                    Curriculum Vitae
                                </span>
                            </div>
                            <p className="text-[15px] font-bold text-zinc-200 group-hover:text-white transition-colors tracking-tight">
                                Download Resume
                            </p>
                            <p className="text-[11px] text-zinc-600 mt-1 group-hover:text-zinc-400 transition-colors">
                                PDF · Updated 2026
                            </p>
                        </div>

                        <ArrowUpRight
                            size={20}
                            className="relative z-10 text-zinc-700 group-hover:text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0"
                        />
                    </motion.a>
                </div>

                {/* ── Socials — editorial directory list ───────────────────── */}
                <motion.div {...fadeUp(0.28)} className="mt-14">

                    <div className="flex items-center justify-between mb-0 pb-3 border-b border-zinc-800/70">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-zinc-600">
                            Find me on
                        </span>
                        <span className="text-[10px] font-mono text-zinc-700">
                            {socials.length} profiles
                        </span>
                    </div>

                    {socials.map((social, idx) => (
                        <SocialRow key={social.name} social={social} index={idx} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}