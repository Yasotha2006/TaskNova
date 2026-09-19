export type Priority = 'high' | 'medium' | 'low';

export interface Mission {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

export interface MissionStats {
  total: number;
  completed: number;
  pending: number;
  high: number;
  medium: number;
  low: number;
  progress: number;
}

export type StatusFilter = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | Priority;

export const PRIORITY_META: Record<Priority, {
  label: string;
  color: string;
  dot: string;
  border: string;
  glow: string;
  ring: string;
  symbol: string;
}> = {
  high: {
    label: 'HIGH',
    color: 'priority-high',
    dot: 'bg-red-400',
    border: 'border-high',
    glow: 'rgba(248,113,113,0.5)',
    ring: '#f87171',
    symbol: '◉',
  },
  medium: {
    label: 'MEDIUM',
    color: 'priority-med',
    dot: 'bg-amber-400',
    border: 'border-med',
    glow: 'rgba(251,191,36,0.5)',
    ring: '#fbbf24',
    symbol: '○',
  },
  low: {
    label: 'LOW',
    color: 'priority-low',
    dot: 'bg-emerald-400',
    border: 'border-low',
    glow: 'rgba(52,211,153,0.5)',
    ring: '#34d399',
    symbol: '◌',
  },
};

export const PROGRESS_MESSAGES: { min: number; max: number; text: string }[] = [
  { min: 0, max: 0, text: 'Universe awaiting its first mission.' },
  { min: 1, max: 30, text: 'Your journey has begun.' },
  { min: 31, max: 70, text: 'Your universe is expanding.' },
  { min: 71, max: 99, text: 'Mission completion approaching.' },
  { min: 100, max: 100, text: 'Universe fully synchronized.' },
];

export function getProgressMessage(pct: number): string {
  return PROGRESS_MESSAGES.find((m) => pct >= m.min && pct <= m.max)?.text ?? PROGRESS_MESSAGES[0].text;
}
