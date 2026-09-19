import { useEffect, useRef, useState } from 'react';
import { Sparkles, CheckCircle2, Clock } from 'lucide-react';
import type { MissionStats } from '@/types';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  delay?: string;
  accentColor: string;
  accentBg: string;
  symbol: string;
}

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  const ref = useRef<number>(0);
  useEffect(() => {
    let raf = 0;
    const start = ref.current;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(start + (target - start) * eased);
      setVal(next);
      ref.current = next;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function StatCard({ icon, label, value, delay = '', accentColor, accentBg, symbol }: StatCardProps) {
  const display = useCountUp(value);
  return (
    <div className={`glass rounded-2xl p-5 sm:p-6 relative overflow-hidden fade-up-sm ${delay}`}>
      <div
        className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-40"
        style={{ background: accentBg }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-body tracking-[0.18em] uppercase text-white/50">
            <span className="text-base" style={{ color: accentColor }} aria-hidden>
              {symbol}
            </span>
            {label}
          </div>
          <div className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tabular-nums" aria-live="polite">
            {display}
          </div>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accentColor}25`, color: accentColor }}
          aria-hidden
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

interface StatsProps {
  stats: MissionStats;
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
      <StatCard
        icon={<Sparkles size={18} />}
        label="Total Missions"
        value={stats.total}
        accentColor="#a78bfa"
        accentBg="rgba(139,92,246,0.5)"
        symbol="✦"
      />
      <StatCard
        icon={<CheckCircle2 size={18} />}
        label="Completed"
        value={stats.completed}
        delay="delay-1"
        accentColor="#34d399"
        accentBg="rgba(52,211,153,0.5)"
        symbol="◉"
      />
      <StatCard
        icon={<Clock size={18} />}
        label="Pending"
        value={stats.pending}
        delay="delay-2"
        accentColor="#22d3ee"
        accentBg="rgba(34,211,238,0.5)"
        symbol="◌"
      />
    </div>
  );
}
