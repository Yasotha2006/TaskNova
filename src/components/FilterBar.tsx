import type { PriorityFilter, StatusFilter } from '@/types';

interface FilterBarProps {
  status: StatusFilter;
  priority: PriorityFilter;
  onStatus: (s: StatusFilter) => void;
  onPriority: (p: PriorityFilter) => void;
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'active', label: 'ACTIVE' },
  { value: 'completed', label: 'COMPLETED' },
];

const PRIORITY_OPTIONS: { value: PriorityFilter; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'high', label: 'HIGH' },
  { value: 'medium', label: 'MEDIUM' },
  { value: 'low', label: 'LOW' },
];

export default function FilterBar({ status, priority, onStatus, onPriority }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
      {/* Status */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-body tracking-[0.16em] uppercase text-white/40 shrink-0 hidden sm:block">
          Status
        </span>
        <div
          className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0"
          role="radiogroup"
          aria-label="Status filter"
        >
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onStatus(opt.value)}
              className={`pill ${status === opt.value ? 'active' : ''}`}
              role="radio"
              aria-checked={status === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-5 w-px bg-white/10" />

      {/* Priority */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-body tracking-[0.16em] uppercase text-white/40 shrink-0 hidden sm:block">
          Priority
        </span>
        <div
          className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0"
          role="radiogroup"
          aria-label="Priority filter"
        >
          {PRIORITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onPriority(opt.value)}
              className={`pill ${priority === opt.value ? 'active' : ''}`}
              role="radio"
              aria-checked={priority === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
