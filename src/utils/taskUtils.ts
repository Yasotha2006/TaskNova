import type { Mission, MissionStats, PriorityFilter, StatusFilter } from '@/types';

export function getMissionNumber(id: string): string {
  const match = id.match(/tn-(\d+)/i);
  return match ? `TN-${match[1].padStart(3, '0')}` : 'TN-000';
}

export function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export interface FilterCriteria {
  search: string;
  status: StatusFilter;
  priority: PriorityFilter;
}

export function filterMissions(
  tasks: Mission[],
  { search, status, priority }: FilterCriteria,
): Mission[] {
  const query = search.trim().toLowerCase();
  return tasks.filter((m) => {
    if (query && !m.title.toLowerCase().includes(query)) return false;
    if (status === 'active' && m.completed) return false;
    if (status === 'completed' && !m.completed) return false;
    if (priority !== 'all' && m.priority !== priority) return false;
    return true;
  });
}

export function computeStats(tasks: Mission[]): MissionStats {
  const total = tasks.length;
  const completed = tasks.filter((m) => m.completed).length;
  const pending = total - completed;
  const high = tasks.filter((m) => m.priority === 'high').length;
  const medium = tasks.filter((m) => m.priority === 'medium').length;
  const low = tasks.filter((m) => m.priority === 'low').length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, pending, high, medium, low, progress };
}

export interface Milestone {
  id: string;
  threshold: number;
  label: string;
  description: string;
}

export const MILESTONES: Milestone[] = [
  { id: 'first', threshold: 1, label: 'FIRST MISSION', description: 'Completed your first mission.' },
  { id: 'rising', threshold: 5, label: 'RISING EXPLORER', description: 'Completed 5 missions.' },
  { id: 'builder', threshold: 10, label: 'COSMIC BUILDER', description: 'Completed 10 missions.' },
  { id: 'master', threshold: 25, label: 'UNIVERSE MASTER', description: 'Completed 25 missions.' },
];

export function getReachedMilestones(completed: number): Milestone[] {
  return MILESTONES.filter((m) => completed >= m.threshold);
}

export function getNextMilestone(completed: number): Milestone | null {
  return MILESTONES.find((m) => completed < m.threshold) ?? null;
}
