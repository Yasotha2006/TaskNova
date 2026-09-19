import { useEffect, useRef, useState } from 'react';

interface ProgressRingProps {
  percentage: number;
  completed: number;
  total: number;
  message: string;
}

export default function ProgressRing({ percentage, completed, total, message }: ProgressRingProps) {
  const size = 240;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const [displayPct, setDisplayPct] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const start = displayPct;
    const startTime = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayPct(Math.round(start + (percentage - start) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  const offset = circumference - (displayPct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Ring with orbits */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer orbit */}
        <div
          className="absolute inset-0 rounded-full border border-violet-400/15 spin-slow"
          aria-hidden
        >
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-violet-300"
            style={{ boxShadow: '0 0 10px rgba(167,139,250,0.9)' }}
          />
        </div>
        {/* Mid orbit */}
        <div
          className="absolute inset-4 rounded-full border border-dashed border-cyan-400/12 spin-rev"
          aria-hidden
        />

        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="progressGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter="url(#progressGlow)"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
          {/* Moving particle on the ring */}
          {displayPct > 0 && displayPct < 100 && (
            <circle
              cx={size / 2}
              cy={size / 2 - radius}
              r="5"
              fill="#fff"
              style={{
                transformOrigin: `${size / 2}px ${size / 2}px`,
                transform: `rotate(${(displayPct / 100) * 360}deg)`,
                transition: 'transform 0.3s ease',
                filter: 'drop-shadow(0 0 6px #8b5cf6)',
              }}
            />
          )}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-bold text-white tabular-nums text-glow">
            {displayPct}
            <span className="text-2xl text-violet-400">%</span>
          </span>
          <span className="mt-2 text-xs text-white/45 font-body tracking-wider uppercase">
            {completed} of {total} missions
          </span>
        </div>
      </div>

      {/* Message */}
      <p className="mt-6 text-center text-sm sm:text-base text-cyan-300/80 font-body italic max-w-xs">
        {message}
      </p>
    </div>
  );
}
