import { Check, Pencil, Trash2 } from 'lucide-react';
import type { Mission } from '@/types';
import { PRIORITY_META } from '@/types';
import { formatRelativeTime, getMissionNumber } from '@/utils/taskUtils';

interface MissionCardProps {
  mission: Mission;
  onToggle: (id: string) => void;
  onEdit: (mission: Mission) => void;
  onDelete: (mission: Mission) => void;
  index: number;
}

export default function MissionCard({ mission, onToggle, onEdit, onDelete, index }: MissionCardProps) {
  const meta = PRIORITY_META[mission.priority];
  const missionId = getMissionNumber(mission.id);

  return (
    <article
      className={`mission-card glass rounded-2xl p-5 relative overflow-hidden fade-up-sm ${
        mission.completed ? 'mission-complete' : ''
      }`}
      style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s` }}
    >
      <div
        className={`card-glow absolute inset-0 rounded-2xl pointer-events-none ${meta.border}`}
        style={{ opacity: 0 }}
        aria-hidden
      />

      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ background: meta.ring, boxShadow: `0 0 12px ${meta.glow}` }}
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <button
          onClick={() => onToggle(mission.id)}
          className={`cosmic-check ${mission.completed ? 'checked' : ''} mt-0.5`}
          aria-label={mission.completed ? `Mark "${mission.title}" as active` : `Mark "${mission.title}" as completed`}
          aria-pressed={mission.completed}
        >
          {mission.completed && <Check size={14} className="text-white" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-display tracking-wider text-white/35">
              MISSION #{missionId}
            </span>
            <span className="text-[10px] text-white/25" aria-hidden>·</span>
            <span className={`text-[10px] font-display tracking-wider ${meta.color}`}>
              {mission.completed ? '✓ COMPLETE' : `${meta.symbol} ACTIVE`}
            </span>
          </div>

          <h3
            className={`mission-title font-body text-base sm:text-lg font-medium text-white/95 break-words leading-snug ${
              mission.completed ? 'line-through' : ''
            }`}
          >
            {mission.title}
          </h3>

          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider ${meta.color}`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.ring }} aria-hidden />
              {meta.label} PRIORITY
            </span>
            <time className="text-[11px] text-white/30" dateTime={new Date(mission.createdAt).toISOString()}>
              {formatRelativeTime(mission.createdAt)}
            </time>
          </div>
        </div>

        <div className="card-actions flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(mission)}
            className="p-2 rounded-lg text-white/50 hover:text-cyan-300 hover:bg-cyan-400/10 transition-colors"
            aria-label={`Edit mission: ${mission.title}`}
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(mission)}
            className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            aria-label={`Abort mission: ${mission.title}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
