import { useEffect, useRef, useState } from 'react';
import { Rocket, Plus } from 'lucide-react';
import type { Priority } from '@/types';
import { PRIORITY_META } from '@/types';

interface LaunchMissionProps {
  onLaunch: (title: string, priority: Priority) => void;
}

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

export default function LaunchMission({ onLaunch }: LaunchMissionProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [burst, setBurst] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => inputRef.current?.focus();
    window.addEventListener('tasknova:focus-launch', handler);
    return () => window.removeEventListener('tasknova:focus-launch', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Mission name is required to launch.');
      inputRef.current?.focus();
      return;
    }
    setError('');
    onLaunch(trimmed, priority);
    setTitle('');
    setPriority('medium');
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-5 sm:p-6 relative overflow-hidden fade-up"
    >
      <div
        className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-30"
        style={{ background: 'rgba(139,92,246,0.6)' }}
        aria-hidden
      />

      <div className="relative">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
            <Rocket size={18} />
          </div>
          <h2 className="font-display text-base sm:text-lg font-bold tracking-wider text-white">
            LAUNCH NEW MISSION
          </h2>
        </div>

        <label htmlFor="mission-title" className="block text-xs font-body tracking-[0.16em] uppercase text-white/45 mb-2">
          Mission Name
        </label>
        <input
          ref={inputRef}
          id="mission-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="What mission are you preparing for?"
          className="cosmic-input w-full rounded-xl px-4 py-3 text-sm sm:text-base"
          maxLength={120}
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={error ? 'mission-title-error' : undefined}
        />
        {error && (
          <p id="mission-title-error" className="mt-2 text-xs text-red-300" role="alert">
            {error}
          </p>
        )}

        <fieldset className="mt-4">
          <legend className="block text-xs font-body tracking-[0.16em] uppercase text-white/45 mb-2.5">
            Priority
          </legend>
          <div className="grid grid-cols-3 gap-2.5">
            {PRIORITIES.map((p) => {
              const meta = PRIORITY_META[p];
              const selected = priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`relative px-3 py-2.5 rounded-xl border text-xs font-semibold tracking-wider transition-all ${
                    selected
                      ? `${meta.border} ${meta.color} bg-white/[0.03]`
                      : 'border-white/10 text-white/50 hover:text-white/80 hover:border-white/20'
                  }`}
                  aria-pressed={selected}
                >
                  <span className="mr-1.5" aria-hidden>{meta.symbol}</span>
                  {meta.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button
          type="submit"
          className="btn-primary mt-5 w-full px-6 py-3.5 rounded-xl text-white font-semibold tracking-wide flex items-center justify-center gap-2.5 text-sm sm:text-base"
        >
          {burst ? <Plus size={18} className="rotate-45 transition-transform" /> : <Rocket size={18} />}
          <span>LAUNCH MISSION</span>
        </button>
      </div>

      {burst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="burst-particle"
              style={{
                transform: `rotate(${i * 36}deg) translateY(-40px)`,
                animationDelay: `${i * 0.02}s`,
              }}
            />
          ))}
        </div>
      )}
    </form>
  );
}
