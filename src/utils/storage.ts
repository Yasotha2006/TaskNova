import type { Mission, Priority } from '@/types';

export const STORAGE_KEY = 'tasknova_tasks';

const VALID_PRIORITIES: Priority[] = ['high', 'medium', 'low'];

function isValidMission(value: unknown): value is Mission {
  if (typeof value !== 'object' || value === null) return false;
  const m = value as Record<string, unknown>;
  return (
    typeof m.id === 'string' &&
    typeof m.title === 'string' &&
    typeof m.createdAt === 'number' &&
    typeof m.completed === 'boolean' &&
    typeof m.priority === 'string' &&
    VALID_PRIORITIES.includes(m.priority as Priority)
  );
}

export function loadTasks(): Mission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidMission);
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Mission[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function generateId(sequence: number): string {
  const rand = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return `tn-${String(sequence).padStart(3, '0')}-${rand}`;
}

export function extractSequence(tasks: Mission[]): number {
  return tasks.reduce((max, m) => {
    const match = m.id.match(/tn-(\d+)/i);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 0);
}
