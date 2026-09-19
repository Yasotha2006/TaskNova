import { Rocket, SearchX } from 'lucide-react';

interface EmptyStateProps {
  variant: 'empty' | 'no-results';
  onLaunch?: () => void;
  onClear?: () => void;
}

export default function EmptyState({ variant, onLaunch, onClear }: EmptyStateProps) {
  if (variant === 'no-results') {
    return (
      <div className="glass rounded-2xl py-16 px-6 text-center fade-up-sm">
        <div className="mx-auto mb-6 h-14 w-14 flex items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300" aria-hidden>
          <SearchX size={26} />
        </div>
        <h3 className="font-display text-xl font-bold tracking-wider text-white">
          MISSION NOT FOUND
        </h3>
        <p className="mt-3 text-sm text-white/50 max-w-sm mx-auto">
          Try changing your search or filters.
        </p>
        {onClear && (
          <button
            onClick={onClear}
            className="btn-ghost mt-6 px-6 py-3 rounded-xl text-white font-medium text-sm tracking-wide"
          >
            CLEAR SEARCH
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl py-20 px-6 text-center fade-up-sm relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-white pulse-soft" />
        <div className="absolute top-1/3 right-1/3 h-1 w-1 rounded-full bg-white pulse-soft" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 h-1 w-1 rounded-full bg-white pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/4 h-1 w-1 rounded-full bg-white pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-violet-300 pulse-soft" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="relative">
        <div className="mx-auto mb-5 h-12 w-12 flex items-center justify-center text-violet-300 text-2xl float-y" aria-hidden>
          ✦
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white">
          YOUR UNIVERSE IS QUIET
        </h3>
        <p className="mt-3 text-sm text-white/50">
          No missions are currently in your orbit.
        </p>
        {onLaunch && (
          <button
            onClick={onLaunch}
            className="btn-primary mt-7 px-7 py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide inline-flex items-center gap-2.5"
          >
            <Rocket size={18} />
            LAUNCH MISSION
          </button>
        )}
      </div>
    </div>
  );
}
