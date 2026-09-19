import type { MissionStats } from '@/types';

interface MissionControlVizProps {
  stats: MissionStats;
}

/**
 * A compact cosmic visualization showing the "Mission Control" orbit map.
 * Purely decorative — the real task list lives below it.
 */
export default function MissionControlViz({ stats }: MissionControlVizProps) {
  const orbits = [
    { label: 'HIGH', count: stats.high, color: '#f87171', size: 92 },
    { label: 'MEDIUM', count: stats.medium, color: '#fbbf24', size: 70 },
    { label: 'LOW', count: stats.low, color: '#34d399', size: 48 },
  ];

  return (
    <div className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64 flex items-center justify-center" aria-hidden="true">
      {/* Orbit rings with particle counts */}
      {orbits.map((o, i) => (
        <div
          key={o.label}
          className="absolute rounded-full border spin-slow"
          style={{
            width: `${o.size}%`,
            height: `${o.size}%`,
            borderColor: `${o.color}30`,
            animationDuration: `${30 + i * 10}s`,
          }}
        >
          {/* particle on orbit */}
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full"
            style={{ background: o.color, boxShadow: `0 0 10px ${o.color}` }}
          />
          {/* label */}
          <span
            className="absolute top-1/2 -translate-y-1/2 text-[9px] font-display tracking-wider"
            style={{
              [i % 2 === 0 ? 'right' : 'left']: '-52px',
              color: `${o.color}cc`,
            } as React.CSSProperties}
          >
            {o.label} · {o.count}
          </span>
        </div>
      ))}

      {/* Inner dashed orbit */}
      <div className="absolute rounded-full border border-dashed border-cyan-400/20 spin-rev" style={{ width: '34%', height: '34%', animationDuration: '20s' }}>
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300" style={{ boxShadow: '0 0 8px #22d3ee' }} />
      </div>

      {/* Core */}
      <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 shadow-[0_0_36px_rgba(139,92,246,0.6)] flex items-center justify-center float-y">
        <span className="font-display text-[10px] font-bold text-white text-glow">TN</span>
      </div>

      {/* Top & bottom stars */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 text-violet-300 text-sm">✦</span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-cyan-300 text-sm">✦</span>
    </div>
  );
}
