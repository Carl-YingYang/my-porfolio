import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Lock, X, Info } from 'lucide-react';

// Images & GIFs Imports
import lexSimpleGif from '../assets/projects/lex-simple.gif';
import tailorDropImg from '../assets/projects/ap-matrix.png.png';

const projectsData = [
    {
        id: 'lex-simple',
        role: 'AI Engineer & Full-Stack App Dev',
        title: 'Lex-Simple',
        problem: 'An technical legal contracts are unreadable for average filipino citizens, leading to potential exploitation through predatory clauses.',
        solution: 'An offline OCR and RAG-integrated system that acts as a Linguistic Bridge, simplifying complex text into conversational Taglish without offering unauthorized legal advice.',
        techStack: ['Python', 'OCR', 'RAG Architecture', 'AI Integration', 'React Native', 'Api Integration'],
        image: lexSimpleGif,
        liveLink: '#', // Dahil '#', hindi lalabas ang Live Preview button
        githubLink: 'private',
        isWeb: false
    },
    {
        id: 'tailordrop',
        role: 'Full-Stack Web Developer',
        title: 'AP Matrix Clothing Line',
        problem: 'Inefficient manual processing and fragmented communication for bulk tailoring orders.',
        solution: 'An end-to-end e-commerce booking platform designed for multi-step order configurations and seamless business data transfer.',
        techStack: ['React Vite', 'Business Logic Design', 'Vercel', 'Hugging Face', 'GitHub', 'Python', 'Api Integration'],
        image: tailorDropImg,
        liveLink: 'https://ap-matrix-clothing-line.vercel.app/',
        githubLink: 'https://github.com/Carl-YingYang/A-P-Matrix-Clothing-Line.git',
        isWeb: true
    }
];

export default function Projects() {
    // State para sa custom alert modal natin
    const [showAlert, setShowAlert] = useState(false);

    const handlePrivateRepoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowAlert(true); // Imbes na native alert(), ito na ang itri-trigger natin
    };

    return (
        <section id="projects" className="w-full py-20 relative bg-transparent">

            {/* Ambient Background Glow (Cinematic Red) */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40%] h-[60%] bg-red-700/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="w-full max-w-5xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight flex items-center gap-4">
                        <span className="text-red-600 font-mono text-lg md:text-xl">02.</span> Featured Projects
                    </h2>
                    <div className="h-0.5 w-12 bg-red-600 mt-3 ml-11"></div>
                </motion.div>

                {/* Projects List */}
                <div className="space-y-24 md:space-y-32">
                    {projectsData.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                        >
                            {/* --- TEXT CONTENT COLUMN --- */}
                            <div className={`lg:col-span-6 flex flex-col justify-center z-10 ${i % 2 !== 0 ? 'lg:order-first' : 'lg:order-last'}`}>

                                <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                                    {project.role}
                                </span>

                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                                    {project.title}
                                </h3>

                                {/* Problem & Solution Box */}
                                <div className="p-7 md:p-8 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-2xl mb-8 shadow-xl group-hover:border-red-500/20 transition-colors">
                                    <div className="mb-6">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">The Problem</span>
                                        <p className="text-zinc-400 leading-relaxed text-sm">
                                            {project.problem}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest block mb-2">The Solution</span>
                                        <p className="text-zinc-300 leading-relaxed text-sm">
                                            {project.solution}
                                        </p>
                                    </div>
                                </div>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-400 text-[10px] rounded-lg font-mono font-bold tracking-widest uppercase hover:bg-white/10 hover:text-white transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 items-center">

                                    {/* Hide Live Preview if link is '#' */}
                                    {project.liveLink !== '#' && (
                                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto justify-center">
                                            Live Preview <ExternalLink size={14} />
                                        </a>
                                    )}

                                    {/* Conditional Logic for Private/Public Repo */}
                                    {project.githubLink === 'private' ? (
                                        <button
                                            onClick={handlePrivateRepoClick}
                                            className="flex items-center gap-2 text-zinc-500 bg-white/[0.01] border border-white/5 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 px-6 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 w-full sm:w-auto justify-center cursor-pointer"
                                        >
                                            Repo Private <Lock size={14} />
                                        </button>
                                    ) : (
                                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-400 bg-white/[0.02] border border-white/10 hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
                                            Source Code <Code size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* --- VISUAL/IMAGE COLUMN --- */}
                            <div className={`lg:col-span-6 w-full relative flex items-center justify-center ${i % 2 !== 0 ? 'lg:order-last' : 'lg:order-first'}`}>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-red-600/10 blur-[80px] pointer-events-none group-hover:bg-red-500/20 transition-all duration-700 z-0"></div>

                                {project.isWeb ? (
                                    <div className="relative z-10 w-full sm:w-[110%] lg:w-[125%] max-w-none aspect-[16/10] bg-[#050505] border border-white/[0.05] rounded-xl flex flex-col overflow-hidden shadow-2xl group-hover:border-white/10 transition-colors">
                                        <div className="w-full bg-white/[0.02] border-b border-white/[0.05] px-4 py-2.5 flex items-center justify-between shrink-0">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50"></div>
                                            </div>
                                            <div className="bg-black/50 border border-white/5 rounded px-3 py-1 text-[9px] text-zinc-500 font-mono tracking-widest hidden sm:block">
                                                {project.liveLink.replace('https://', '').replace('/', '')}
                                            </div>
                                            <div className="w-10 hidden sm:block"></div>
                                        </div>
                                        <div className="w-full flex-1 relative bg-black overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative z-10 w-full max-w-[260px] md:max-w-[280px] aspect-[9/19] bg-white/[0.01] border border-white/[0.05] backdrop-blur-xl rounded-[2.5rem] p-4 flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-white/10 transition-colors">
                                        <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-black relative">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- CUSTOM PRIVATE REPO ALERT MODAL --- */}
            <AnimatePresence>
                {showAlert && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAlert(false)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-sm bg-[#0c0303] border border-white/10 p-8 rounded-2xl shadow-[0_0_60px_rgba(220,38,38,0.15)] text-center z-10"
                        >
                            <button onClick={() => setShowAlert(false)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors active:scale-95">
                                <X size={16} />
                            </button>

                            <div className="mx-auto w-12 h-12 mb-5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                                <Info size={24} />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">Repository Private</h3>

                            <p className="text-zinc-400 leading-relaxed text-sm mb-8">
                                Hindi ko pa siya nade-deploy at wala pang public repo.
                                <br /><br />
                                If you really want to know more about how I built this, feel free to contact me!
                            </p>

                            <button
                                onClick={() => setShowAlert(false)}
                                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                Understood
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </section>
    );
}