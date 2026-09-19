import { Award, Lock } from 'lucide-react';
import type { Milestone } from '@/utils/taskUtils';

interface CosmicMilestonesProps {
  reached: Milestone[];
  next: Milestone | null;
  completed: number;
}

export default function CosmicMilestones({ reached, next, completed }: CosmicMilestonesProps) {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8 fade-up">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
          <Award size={18} />
        </div>
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold tracking-wider text-white">
            COSMIC MILESTONES
          </h3>
          <p className="text-xs text-white/40 mt-0.5">
            {reached.length > 0
              ? `${reached.length} of 4 milestones reached`
              : 'Complete missions to unlock milestones'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reached.map((m) => (
          <div
            key={m.id}
            className="glass-soft rounded-xl p-4 flex items-center gap-3 milestone-reached"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300 shrink-0">
              <Award size={18} />
            </div>
            <div className="min-w-0">
              <div className="font-display text-xs font-bold tracking-wider text-amber-200">
                {m.label}
              </div>
              <div className="text-xs text-white/45 mt-0.5 truncate">{m.description}</div>
            </div>
          </div>
        ))}

        {next && (
          <div className="glass-soft rounded-xl p-4 flex items-center gap-3 opacity-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/30 shrink-0">
              <Lock size={16} />
            </div>
            <div className="min-w-0">
              <div className="font-display text-xs font-bold tracking-wider text-white/50">
                {next.label}
              </div>
              <div className="text-xs text-white/30 mt-0.5">
                {next.threshold - completed} more to unlock
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
