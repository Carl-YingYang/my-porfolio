import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import ContentCreation from './sections/ContentCreation';
import Contact from './sections/Contact';
import ChatWidget from './components/ChatWidget';

// ─── Divider Component (More Visible Cinematic Red) ───
const SectionDivider = () => (
  <div className="w-full max-w-5xl mx-auto px-6 opacity-80">
    {/* Tinaasan ang kapal (h-[2px]) at ginawang solid red ang gitna */}
    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-800 to-transparent" />
  </div>
);

export default function App() {
  return (
    <div className="relative bg-[#0c0303] min-h-screen selection:bg-red-900/50 selection:text-red-100 text-white font-sans overflow-x-hidden">

      {/* ─── VINTAGE FILM NOISE ─── */}
      <div className="vintage-noise pointer-events-none"></div>

      {/* ─── GLOBAL ANIMATED BACKGROUND (CINEMATIC RED) ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Orb 1 - Deep Crimson */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-red-600/20 blur-[120px] rounded-full animate-blob"></div>

        {/* Orb 2 - Ruby / Dark Rose */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-rose-600/20 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>

        {/* Orb 3 - Blood Orange */}
        <div className="absolute top-[30%] right-[-5%] w-[35vw] h-[35vw] bg-orange-600/20 blur-[120px] rounded-full animate-blob animation-delay-4000"></div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <ContentCreation />
        <SectionDivider />
        <Contact />
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 w-full py-12 text-center border-t border-red-900/40 bg-[#0c0303]/90 backdrop-blur-md">
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Designed & Engineered by Carl Micky Nieva &copy; 2026
        </p>
      </footer>

      {/* ─── CHAT WIDGET ─── */}
      <div className="relative z-[999]">
        <ChatWidget />
      </div>

    </div>
  );
}