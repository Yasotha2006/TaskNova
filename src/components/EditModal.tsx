import { useEffect, useRef, useState } from 'react';
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
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (mission) {
      setTitle(mission.title);
      setPriority(mission.priority);
      setError('');
      previouslyFocused.current = document.activeElement as HTMLElement;
    }
  }, [mission]);

  useEffect(() => {
    if (!mission) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    inputRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocused.current?.focus();
    };
  }, [mission, onClose]);

  if (!mission) return null;

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Mission name is required.');
      inputRef.current?.focus();
      return;
    }
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
        ref={dialogRef}
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

          <label htmlFor="edit-title" className="block text-xs font-body tracking-[0.16em] uppercase text-white/45 mb-2">
            Mission Name
          </label>
          <input
            ref={inputRef}
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            className="cosmic-input w-full rounded-xl px-4 py-3 text-sm"
            maxLength={120}
            autoComplete="off"
            aria-invalid={!!error}
            aria-describedby={error ? 'edit-title-error' : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
            }}
          />
          {error && (
            <p id="edit-title-error" className="mt-2 text-xs text-red-300" role="alert">
              {error}
            </p>
          )}

          <fieldset className="mt-4">
            <legend className="block text-xs font-body tracking-[0.16em] uppercase text-white/45 mb-2">
              Mission Priority
            </legend>
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
                    <span className="mr-1.5" aria-hidden>{meta.symbol}</span>
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

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
