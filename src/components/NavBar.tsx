import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

function CosmicClock() {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const date = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="hidden lg:flex items-center gap-3 text-xs font-body">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pulse-soft" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-emerald-300/90 font-medium tracking-wider uppercase">Stable</span>
      </div>
      <span className="text-white/20" aria-hidden>|</span>
      <span className="text-white/60 tabular-nums">{date}</span>
      <span className="text-cyan-300/90 tabular-nums font-medium">{time}</span>
    </div>
  );
}

interface NavBarProps {
  active: string;
  onNav: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'mission-control', label: 'Mission Control' },
  { id: 'missions', label: 'Missions' },
  { id: 'universe-progress', label: 'Universe Progress' },
];

export default function NavBar({ active, onNav }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNav(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="glass-soft border-b border-white/5">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
          <button
            onClick={() => handleNav('hero')}
            className="flex items-center gap-2.5 group"
            aria-label="TaskNova home"
          >
            <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden>
              <span className="absolute inset-0 rounded-full border border-violet-400/40 spin-med" />
              <span className="absolute -inset-1 rounded-full border border-cyan-400/20 spin-rev" />
              <span className="h-3 w-3 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shadow-[0_0_14px_rgba(139,92,246,0.8)]" />
            </span>
            <span className="font-display text-lg font-bold tracking-widest text-white group-hover:text-glow transition-all">
              TASK<span className="text-violet-400">NOVA</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-lg ${
                  active === item.id
                    ? 'text-white'
                    : 'text-white/55 hover:text-white/90'
                }`}
                aria-current={active === item.id ? 'page' : undefined}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_8px_rgba(139,92,246,0.8)]" aria-hidden />
                )}
              </button>
            ))}
          </div>

          <CosmicClock />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="md:hidden glass-soft border-b border-white/10 fade-up-sm">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-left px-4 py-3 text-sm font-medium tracking-wide rounded-lg transition-colors ${
                  active === item.id
                    ? 'text-white bg-violet-500/15 border border-violet-400/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                aria-current={active === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
