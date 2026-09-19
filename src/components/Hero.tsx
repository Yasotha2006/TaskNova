import { Rocket, Compass } from 'lucide-react';

interface HeroProps {
  onLaunch: () => void;
  onExplore: () => void;
  total: number;
}

export default function Hero({ onLaunch, onExplore, total }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 pt-20"
    >
      <div className="text-center max-w-3xl mx-auto">
        <div className="relative mx-auto mb-10 h-40 w-40 sm:h-48 sm:w-48 flex items-center justify-center fade-up" aria-hidden>
          <div className="orbit-ring spin-slow" style={{ width: '100%', height: '100%' }}>
            <span className="orbit-particle" style={{ background: 'radial-gradient(circle,#fff,rgba(59,130,246,0))', boxShadow: '0 0 12px rgba(255,255,255,0.9)' }} />
          </div>
          <div className="orbit-ring orbit-ring--dash spin-rev" style={{ width: '78%', height: '78%' }}>
            <span className="orbit-particle" style={{ background: 'radial-gradient(circle,#fff,rgba(34,211,238,0))', boxShadow: '0 0 12px rgba(34,211,238,0.9)' }} />
          </div>
          <div className="orbit-ring spin-fast" style={{ width: '56%', height: '56%' }}>
            <span className="orbit-particle" style={{ background: 'radial-gradient(circle,#fff,rgba(139,92,246,0))', boxShadow: '0 0 12px rgba(139,92,246,0.9)' }} />
          </div>

          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 shadow-[0_0_50px_rgba(139,92,246,0.7)] float-y">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 to-transparent" />
            <div className="absolute inset-2 rounded-full bg-[#04060f]/40 backdrop-blur-sm flex items-center justify-center">
              <span className="font-display text-xs sm:text-sm font-bold text-white text-glow">TN</span>
            </div>
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[0.12em] text-white text-glow fade-up delay-1">
          TASK<span className="text-violet-400">NOVA</span>
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-white/70 font-body tracking-wide fade-up delay-2">
          Your Productivity Universe
        </p>

        <p className="mt-2 text-sm sm:text-base text-cyan-300/70 font-body italic fade-up delay-2">
          Turn Every Task Into A Mission.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 fade-up delay-3">
          <button
            onClick={onLaunch}
            className="btn-primary px-7 py-3.5 rounded-xl text-white font-semibold tracking-wide flex items-center gap-2.5 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <Rocket size={18} className="shrink-0" />
            <span>LAUNCH YOUR FIRST MISSION</span>
          </button>
          <button
            onClick={onExplore}
            className="btn-ghost px-7 py-3.5 rounded-xl text-white/90 font-medium tracking-wide flex items-center gap-2.5 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <Compass size={18} className="shrink-0 text-cyan-300" />
            <span>EXPLORE MISSIONS</span>
          </button>
        </div>

        {total > 0 && (
          <p className="mt-8 text-xs text-white/40 font-body tracking-wider uppercase fade-up delay-4">
            {total} {total === 1 ? 'Mission' : 'Missions'} currently in orbit
          </p>
        )}
      </div>
    </section>
  );
}
