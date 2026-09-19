import { useEffect, useMemo, useState } from 'react';
import GalaxyBackground from '@/components/GalaxyBackground';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import LaunchMission from '@/components/LaunchMission';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import MissionCard from '@/components/MissionCard';
import EmptyState from '@/components/EmptyState';
import ProgressRing from '@/components/ProgressRing';
import EditModal from '@/components/EditModal';
import DeleteModal from '@/components/DeleteModal';
import MissionControlViz from '@/components/MissionControlViz';
import CosmicMilestones from '@/components/CosmicMilestones';
import { ToastContainer, useToasts } from '@/components/Toast';
import { useTasks } from '@/hooks/useTasks';
import type { Mission, PriorityFilter, StatusFilter } from '@/types';
import { getProgressMessage } from '@/types';
import { filterMissions, getReachedMilestones, getNextMilestone } from '@/utils/taskUtils';

export default function App() {
  const { tasks, stats, addTask, toggleTask, updateTask, deleteTask } = useTasks();
  const { toasts, notify, dismiss } = useToasts();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [editTarget, setEditTarget] = useState<Mission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Mission | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const ids = ['hero', 'mission-control', 'missions', 'universe-progress'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const focusLaunch = () => {
    scrollTo('mission-control');
    setTimeout(() => window.dispatchEvent(new Event('tasknova:focus-launch')), 400);
  };

  const filtered = useMemo(
    () => filterMissions(tasks, { search, status: statusFilter, priority: priorityFilter }),
    [tasks, search, statusFilter, priorityFilter],
  );

  const progressMessage = getProgressMessage(stats.progress);
  const reachedMilestones = getReachedMilestones(stats.completed);
  const nextMilestone = getNextMilestone(stats.completed);

  const isEmpty = tasks.length === 0;
  const isFilteredEmpty = filtered.length === 0 && !isEmpty;
  const hasFilters = search !== '' || statusFilter !== 'all' || priorityFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const handleAdd = (title: string, priority: PriorityFilter) => {
    addTask(title, priority as Mission['priority']);
    notify('Mission launched.', 'launch');
  };

  const handleToggle = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    toggleTask(id);
    if (task) {
      notify(task.completed ? 'Mission reactivated.' : 'Mission complete.', 'success');
    }
  };

  const handleEdit = (id: string, title: string, priority: PriorityFilter) => {
    updateTask(id, title, priority as Mission['priority']);
    notify('Mission updated.', 'info');
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    notify('Mission aborted.', 'error');
  };

  return (
    <div className="relative min-h-screen">
      <GalaxyBackground />

      <a
        href="#missions"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-lg focus:glass focus:text-white focus:text-sm"
      >
        Skip to mission list
      </a>

      <NavBar active={activeSection} onNav={scrollTo} />

      <main className="relative z-10">
        <Hero
          onLaunch={focusLaunch}
          onExplore={() => scrollTo('missions')}
          total={stats.total}
        />

        <section
          id="mission-control"
          className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16"
          aria-labelledby="mission-control-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-xs font-display tracking-[0.3em] text-violet-400/80 uppercase mb-3">
                Command Center
              </p>
              <h2 id="mission-control-heading" className="font-display text-2xl sm:text-4xl font-bold tracking-wider text-white">
                MISSION CONTROL
              </h2>
              <p className="mt-3 text-sm text-white/50 max-w-md mx-auto">
                Monitor your productivity universe. Every mission orbits here.
              </p>
            </div>

            <Stats stats={stats} />

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center fade-up delay-2">
                <div className="text-xs font-display tracking-[0.2em] text-white/40 uppercase mb-6">
                  Orbit Map
                </div>
                <MissionControlViz stats={stats} />
                <div className="mt-6 flex items-center gap-2 text-xs text-white/45">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pulse-soft" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="tracking-wider uppercase">Universe Status: Stable</span>
                </div>
              </div>

              <div className="fade-up delay-3">
                <LaunchMission onLaunch={handleAdd} />
              </div>
            </div>
          </div>
        </section>

        <section
          id="missions"
          className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16"
          aria-labelledby="missions-heading"
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-xs font-display tracking-[0.3em] text-cyan-400/80 uppercase mb-3">
                Active Roster
              </p>
              <h2 id="missions-heading" className="font-display text-2xl sm:text-4xl font-bold tracking-wider text-white">
                MISSIONS
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              <SearchBar value={search} onChange={setSearch} />
              <FilterBar
                status={statusFilter}
                priority={priorityFilter}
                onStatus={setStatusFilter}
                onPriority={setPriorityFilter}
              />
            </div>

            <div className="space-y-3.5" aria-live="polite">
              {isEmpty && (
                <EmptyState variant="empty" onLaunch={focusLaunch} />
              )}

              {!isEmpty && isFilteredEmpty && (
                <EmptyState variant="no-results" onClear={clearFilters} />
              )}

              {!isEmpty &&
                !isFilteredEmpty &&
                filtered.map((m, i) => (
                  <MissionCard
                    key={m.id}
                    mission={m}
                    index={i}
                    onToggle={handleToggle}
                    onEdit={setEditTarget}
                    onDelete={setDeleteTarget}
                  />
                ))}
            </div>

            {!isEmpty && filtered.length > 0 && (
              <p className="mt-6 text-center text-xs text-white/30">
                {filtered.length} {filtered.length === 1 ? 'mission' : 'missions'} shown
                {hasFilters && (
                  <>
                    {' · '}
                    <button
                      onClick={clearFilters}
                      className="text-violet-300/70 hover:text-violet-300 underline underline-offset-2"
                    >
                      reset filters
                    </button>
                  </>
                )}
              </p>
            )}
          </div>
        </section>

        <section
          id="universe-progress"
          className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16"
          aria-labelledby="progress-heading"
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-xs font-display tracking-[0.3em] text-emerald-400/80 uppercase mb-3">
                Cosmic Progress
              </p>
              <h2 id="progress-heading" className="font-display text-2xl sm:text-4xl font-bold tracking-wider text-white">
                UNIVERSE PROGRESS
              </h2>
            </div>

            <div className="glass rounded-2xl p-8 sm:p-12 flex flex-col items-center fade-up">
              <ProgressRing
                percentage={stats.progress}
                completed={stats.completed}
                total={stats.total}
                message={progressMessage}
              />

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-md">
                {[
                  { label: 'High', count: stats.high, color: '#f87171', sym: '◉' },
                  { label: 'Medium', count: stats.medium, color: '#fbbf24', sym: '○' },
                  { label: 'Low', count: stats.low, color: '#34d399', sym: '◌' },
                ].map((p) => (
                  <div key={p.label} className="glass-soft rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-base mb-1" style={{ color: p.color }} aria-hidden>{p.sym}</div>
                    <div className="font-display text-xl font-bold text-white tabular-nums">{p.count}</div>
                    <div className="text-[10px] tracking-wider uppercase text-white/40 mt-0.5">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <CosmicMilestones
                reached={reachedMilestones}
                next={nextMilestone}
                completed={stats.completed}
              />
            </div>
          </div>
        </section>

        <footer className="relative py-10 px-4 text-center">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden>
                <span className="absolute inset-0 rounded-full border border-violet-400/40 spin-med" />
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue-400 to-violet-500" />
              </span>
              <span className="font-display text-sm font-bold tracking-widest text-white">
                TASK<span className="text-violet-400">NOVA</span>
              </span>
            </div>
            <p className="text-xs text-white/35">
              Your Productivity Universe · Turn Every Task Into A Mission
            </p>
          </div>
        </footer>
      </main>

      <EditModal
        mission={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleEdit}
      />
      <DeleteModal
        mission={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
