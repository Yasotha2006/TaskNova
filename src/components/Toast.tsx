import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Info, AlertCircle, Rocket, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'error' | 'launch';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastProviderValue {
  toasts: Toast[];
  notify: (message: string, type?: ToastType) => void;
  dismiss: (id: number) => void;
}

const TOAST_ICONS: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  info: Info,
  error: AlertCircle,
  launch: Rocket,
};

const TOAST_ACCENTS: Record<ToastType, string> = {
  success: 'text-emerald-300 border-emerald-400/30',
  info: 'text-cyan-300 border-cyan-400/30',
  error: 'text-red-300 border-red-400/30',
  launch: 'text-violet-300 border-violet-400/30',
};

export function useToasts(): ToastProviderValue {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  return { toasts, notify, dismiss };
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => onDismiss(t.id), 3000),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, onDismiss]);

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2.5 w-full max-w-sm px-4 pointer-events-none"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => {
        const Icon = TOAST_ICONS[toast.type];
        return (
          <div
            key={toast.id}
            className={`glass rounded-xl px-4 py-3 flex items-center gap-3 w-full pointer-events-auto fade-up-sm border ${TOAST_ACCENTS[toast.type]}`}
            role="alert"
          >
            <Icon size={18} className="shrink-0" />
            <span className="text-sm text-white/90 font-body flex-1">{toast.message}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
