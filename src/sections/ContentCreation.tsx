import { motion } from 'framer-motion';
import { PlaySquare, ExternalLink } from 'lucide-react';

// I-import ang TikTok video mo dito
import ttVid from '../assets/tiktok/TTvid-6.mp4';

export default function ContentCreation() {
    return (
        <section id="content" className="w-full py-20 relative bg-transparent">

            {/* Ambient Background Glow - Updated to Crimson Red */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40%] h-[60%] bg-red-700/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="w-full max-w-5xl mx-auto px-6 relative z-10">

                {/* Section Header - Matched to About & Projects with Red Accents */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight flex items-center gap-4">
                        <span className="text-red-600 font-mono text-lg md:text-xl">02.5</span> Tech Content
                    </h2>
                    <div className="h-0.5 w-12 bg-red-600 mt-3 ml-[4.5rem]"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                    {/* --- LEFT COLUMN: Description & TikTok Link --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-6 flex flex-col justify-center z-10"
                    >
                        {/* Eyebrow Label - Changed to Red */}
                        <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                            Video Editing & Branding
                        </span>

                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Breaking down AI <br className="hidden md:block" />
                            for the <span className="text-red-500">masses.</span>
                        </h3>

                        {/* Glassmorphism Bio Box */}
                        <div className="p-7 md:p-8 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-2xl mb-8 shadow-xl group-hover:border-red-500/20 transition-colors">
                            <p className="text-zinc-400 leading-relaxed text-sm">
                                Beyond writing code, I edit and produce high-quality, fast-paced educational tech content. I focus on breaking down complex AI terms, system architectures, and software engineering concepts into digestible, short-form videos.
                            </p>
                        </div>

                        {/* Tech Stack Tags - Tighter and cleaner with subtle red hover */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {['CapCut Pro', 'Faceless Niche', '9:16 Format'].map(tag => (
                                <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-400 text-[10px] rounded-lg font-mono font-bold tracking-widest uppercase hover:bg-white/10 hover:text-red-400 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Premium TikTok Account Button */}
                        <a
                            href="https://www.tiktok.com/@carlmickynieva?is_from_webapp=1&sender_device=pc"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-3 text-zinc-300 hover:text-white transition-all w-fit bg-white/[0.02] border border-white/10 hover:border-white/20 pl-3 pr-6 py-2.5 rounded-xl shadow-lg active:scale-95"
                        >
                            <div className="p-2.5 bg-black/50 border border-white/5 rounded-lg group-hover:bg-[#ff0050] group-hover:border-[#ff0050] transition-colors duration-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                                <PlaySquare size={16} className="text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 mb-0.5">Check my journey</span>
                                <span className="text-xs font-bold tracking-tight flex items-center gap-1.5">
                                    @carlmickynieva <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </span>
                            </div>
                        </a>
                    </motion.div>

                    {/* --- RIGHT COLUMN: 9:16 Video Player --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-6 flex justify-center lg:justify-end relative"
                    >
                        {/* Ambient Glow behind the phone - Updated to Red */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-red-600/10 blur-[80px] rounded-full pointer-events-none z-0 group-hover:bg-red-500/20 transition-all duration-700"></div>

                        {/* Phone Mockup Container */}
                        <div className="relative z-10 w-full max-w-[260px] md:max-w-[280px] aspect-[9/18] bg-white/[0.01] border border-white/[0.05] backdrop-blur-xl rounded-[2.5rem] p-3 flex items-center justify-center shadow-2xl overflow-hidden group hover:border-white/10 transition-colors">

                            <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-black relative">
                                {/* The actual video tag */}
                                <video
                                    src={ttVid}
                                    controls
                                    preload="metadata"
                                    className="w-full h-full object-cover bg-black"
                                    poster=""
                                >
                                    Your browser does not support the video tag.
                                </video>

                                {/* Apple-style clean notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#050505] rounded-b-[10px] z-20 pointer-events-none border border-white/5 border-t-0"></div>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}