import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Mission, MissionStats, Priority } from '@/types';

const STORAGE_KEY = 'tasknova.missions.v1';

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadMissions(): Mission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Mission[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m) =>
        m &&
        typeof m.id === 'string' &&
        typeof m.title === 'string' &&
        typeof m.createdAt === 'number' &&
        ['high', 'medium', 'low'].includes(m.priority),
    );
  } catch {
    return [];
  }
}

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>(() => loadMissions());
  const [sequence, setSequence] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
    } catch {
      /* ignore quota errors */
    }
  }, [missions]);

  // track mission count sequence for TN-### IDs
  useEffect(() => {
    const maxNum = missions.reduce((max, m) => {
      const match = m.id.match(/tn(\d+)/i);
      if (match) return Math.max(max, parseInt(match[1], 10));
      return max;
    }, 0);
    setSequence(maxNum);
  }, [missions]);

  const addMission = useCallback((title: string, priority: Priority) => {
    const next = sequence + 1;
    const mission: Mission = {
      id: `tn-${String(next).padStart(3, '0')}-${uid()}`,
      title,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setMissions((prev) => [mission, ...prev]);
    return mission;
  }, [sequence]);

  const toggleMission = useCallback((id: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)),
    );
  }, []);

  const editMission = useCallback((id: string, title: string, priority: Priority) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title, priority } : m)),
    );
  }, []);

  const deleteMission = useCallback((id: string) => {
    setMissions((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setMissions((prev) => prev.filter((m) => !m.completed));
  }, []);

  const stats: MissionStats = useMemo(() => {
    const total = missions.length;
    const completed = missions.filter((m) => m.completed).length;
    const pending = total - completed;
    const high = missions.filter((m) => m.priority === 'high').length;
    const medium = missions.filter((m) => m.priority === 'medium').length;
    const low = missions.filter((m) => m.priority === 'low').length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, high, medium, low, progress };
  }, [missions]);

  return {
    missions,
    stats,
    addMission,
    toggleMission,
    editMission,
    deleteMission,
    clearCompleted,
  };
}
