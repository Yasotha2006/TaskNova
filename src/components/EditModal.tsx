import { useEffect, useState } from 'react';
import type { Mission, Priority } from '@/types';
import { PRIORITY_META } from '@/types';

interface EditModalProps {
  mission: Mission | null;
  onClose: () => void;
  onSave: (id: string, title: string, priority: Priority) => void;
}

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

export default function EditModal({ mission, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  useEffect(() => {
    if (mission) {
      setTitle(mission.title);
      setPriority(mission.priority);
    }
  }, [mission]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (mission) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mission, onClose]);

  if (!mission) return null;

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave(mission.id, trimmed, priority);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
    >
      <div
        className="modal-panel glass rounded-2xl p-6 sm:p-7 w-full max-w-md relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl opacity-30"
          style={{ background: 'rgba(139,92,246,0.6)' }}
          aria-hidden
        />

        <div className="relative">
          <h2 id="edit-modal-title" className="font-display text-lg font-bold tracking-wider text-white mb-1">
            EDIT MISSION
          </h2>
          <p className="text-xs text-white/40 mb-5">Adjust mission parameters</p>

          {/* Title */}
          <label htmlFor="edit-title" className="block text-xs font-body tracking-[0.16em] uppercase text-white/45 mb-2">
            Mission Name
          </label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="cosmic-input w-full rounded-xl px-4 py-3 text-sm"
            maxLength={120}
            autoFocus
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
            }}
          />

          {/* Priority */}
          <label className="block text-xs font-body tracking-[0.16em] uppercase text-white/45 mb-2 mt-4">
            Mission Priority
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {PRIORITIES.map((p) => {
              const meta = PRIORITY_META[p];
              const selected = priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-semibold tracking-wider transition-all ${
                    selected
                      ? `${meta.border} ${meta.color} bg-white/[0.03]`
                      : 'border-white/10 text-white/50 hover:text-white/80 hover:border-white/20'
                  }`}
                  aria-pressed={selected}
                >
                  <span className="mr-1.5">{meta.symbol}</span>
                  {meta.label}
                </button>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="btn-ghost flex-1 px-5 py-3 rounded-xl text-white/80 font-medium text-sm tracking-wide"
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              className="btn-primary flex-1 px-5 py-3 rounded-xl text-white font-semibold text-sm tracking-wide"
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
