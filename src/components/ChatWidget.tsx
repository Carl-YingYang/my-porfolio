import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Send, User, Terminal } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
    role: 'ai' | 'user';
    text: string;
    isNew?: boolean; // Optional na para hindi mag-error sa user messages
};

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_MESSAGE: Message = {
    role: 'ai',
    text: "O.M.N.I. System Online. I am Carl's Neural Interface. How can I assist you today regarding his projects, technical expertise, or professional availability?",
    isNew: false, // False para solid agad ang welcome message
};

// ─── TypingDots (Loading State) ───────────────────────────────────────────────

function TypingDots() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 max-w-[85%] mr-auto"
        >
            <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center shrink-0 shadow-sm">
                {/* Changed to Red Accent */}
                <Terminal size={13} className="text-red-400" />
            </div>
            <div className="px-5 flex items-center gap-[5px] h-10 bg-white/[0.02] border border-white/[0.05] rounded-xl rounded-tl-sm shadow-sm">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        // Changed to Red Accent
                        className="block w-1.5 h-1.5 rounded-full bg-red-400/70 animate-bounce"
                        style={{ animationDuration: '0.9s', animationDelay: `${i * 0.18}s` }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// ─── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({ msg, scrollToBottom }: { msg: Message; scrollToBottom: () => void }) {
    const isUser = msg.role === 'user';
    const [displayedText, setDisplayedText] = useState(msg.isNew && !isUser ? "" : msg.text);
    const [isAnimating, setIsAnimating] = useState(msg.isNew && !isUser);

    useEffect(() => {
        if (msg.isNew && !isUser) {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedText(msg.text.slice(0, i + 1));
                i++;
                scrollToBottom();
                if (i >= msg.text.length) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    msg.isNew = false;
                }
            }, 15);
            return () => clearInterval(interval);
        }
    }, [msg, isUser, scrollToBottom]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex gap-2.5 ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'} max-w-[90%]`}
        >
            {/* Avatar - Changed User background to Red */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-sm ${isUser ? 'bg-red-600 border-red-500/70' : 'bg-white/[0.02] border-white/[0.05]'
                }`}>
                {isUser ? <User size={13} className="text-white" /> : <Terminal size={13} className="text-red-400" />}
            </div>

            {/* Chat Bubble - Changed User bubble to Red */}
            <div className={`px-4 py-3 text-[13px] leading-[1.6] shadow-sm ${isUser
                    ? 'bg-red-600 text-white rounded-xl rounded-tr-sm border border-red-500/60'
                    : 'bg-white/[0.02] border border-white/[0.05] text-zinc-300 rounded-xl rounded-tl-sm'
                }`}>
                {displayedText}
                {isAnimating && (
                    <span className="inline-block w-1 h-3.5 ml-1 bg-red-400/80 animate-pulse align-middle" />
                )}
            </div>
        </motion.div>
    );
}

// ─── Main Chat Widget ─────────────────────────────────────────────────────────

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, []);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isTyping, isOpen, scrollToBottom]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMsg = input.trim();
        if (!userMsg || isTyping) return;

        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });

            if (!res.ok) throw new Error('Network error');
            const data = await res.json();

            setMessages(prev => [
                ...prev,
                { role: 'ai', text: data.reply || "No signal. Check connection.", isNew: true },
            ]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { role: 'ai', text: "System override. Error connecting to O.M.N.I.", isNew: true },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-4 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        // Changed background from #0a0a0a to #0c0303 to match the vintage red theme perfectly
                        className="w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] max-h-[80vh] bg-[#0c0303]/95 backdrop-blur-3xl border border-white/[0.05] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-2"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] bg-white/[0.01]">
                            <div className="flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
                                    <Terminal size={16} className="text-red-500" />
                                    <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                                        {/* Matches the dark red base */}
                                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#0c0303]" />
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-white leading-none mb-1">O.M.N.I. System</p>
                                    <p className="text-[9px] font-mono text-red-400/70 uppercase tracking-widest">Active Neural Link</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5 no-scrollbar">
                            {messages.map((msg, idx) => (
                                <MessageBubble key={idx} msg={msg} scrollToBottom={scrollToBottom} />
                            ))}
                            {isTyping && <TypingDots />}
                            <div ref={messagesEndRef} className="h-px shrink-0" />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/[0.05] bg-white/[0.01]">
                            <form onSubmit={handleSend} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Execute command..."
                                    // Focus border changed to red
                                    className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-[13px] text-white placeholder-zinc-700 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    // Send Button changed to Red
                                    className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-500 disabled:opacity-20 transition-all"
                                >
                                    <Send size={15} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button - Changed to Red */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 md:w-16 md:h-16 bg-red-600 rounded-2xl shadow-lg border border-red-400/30 flex items-center justify-center text-white z-50 hover:bg-red-500 transition-colors"
            >
                {isOpen ? <X size={24} /> : <Terminal size={24} />}
            </motion.button>
        </div>
    );
}