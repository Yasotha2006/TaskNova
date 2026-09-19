import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Mission } from '@/types';

interface DeleteModalProps {
  mission: Mission | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function DeleteModal({ mission, onClose, onConfirm }: DeleteModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const keepButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mission) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button');
        if (focusable.length < 2) return;
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
    keepButtonRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [mission, onClose]);

  if (!mission) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div
        ref={dialogRef}
        className="modal-panel glass rounded-2xl p-6 sm:p-7 w-full max-w-md relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl opacity-30"
          style={{ background: 'rgba(220,38,38,0.5)' }}
          aria-hidden
        />

        <div className="relative text-center">
          <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
            <AlertTriangle size={26} />
          </div>

          <h2 id="delete-modal-title" className="font-display text-lg font-bold tracking-wider text-white">
            ABORT MISSION?
          </h2>
          <p className="mt-3 text-sm text-white/55">
            Are you sure you want to remove this mission from your universe?
          </p>
          <p className="mt-2 text-sm text-white/40 italic break-words">
            "{mission.title}"
          </p>

          <div className="mt-6 flex gap-3">
            <button
              ref={keepButtonRef}
              onClick={onClose}
              className="btn-ghost flex-1 px-5 py-3 rounded-xl text-white/80 font-medium text-sm tracking-wide"
            >
              KEEP MISSION
            </button>
            <button
              onClick={() => {
                onConfirm(mission.id);
                onClose();
              }}
              className="btn-danger flex-1 px-5 py-3 rounded-xl text-white font-semibold text-sm tracking-wide"
            >
              ABORT MISSION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
