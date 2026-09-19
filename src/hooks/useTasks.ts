import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Mission, MissionStats, Priority } from '@/types';
import { loadTasks, saveTasks, generateId, extractSequence } from '@/utils/storage';
import { computeStats } from '@/utils/taskUtils';

export function useTasks() {
  const [tasks, setTasks] = useState<Mission[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((title: string, priority: Priority): Mission => {
    const sequence = extractSequence(tasks) + 1;
    const task: Mission = {
      id: generateId(sequence),
      title,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [task, ...prev]);
    return task;
  }, [tasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const updateTask = useCallback((id: string, title: string, priority: Priority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title, priority } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const stats: MissionStats = useMemo(() => computeStats(tasks), [tasks]);

  return {
    tasks,
    stats,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
  };
}
