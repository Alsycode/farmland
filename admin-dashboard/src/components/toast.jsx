// path: src/components/Toast.jsx
import React from 'react';
import { useToasts } from '../context/ToastContext';

/**
 * Toast container — place near root (rendered by main.jsx).
 * Shows toasts stacked top-right.
 */
export default function ToastContainer() {
  const { toasts, remove } = useToasts();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`max-w-sm px-4 py-2 rounded shadow ${t.type === 'error' ? 'bg-red-500 text-white' : t.type === 'success' ? 'bg-green-500 text-white' : 'bg-white text-gray-900'}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="text-sm">{t.message}</div>
            <button onClick={() => remove(t.id)} className="ml-2 text-xs opacity-80">✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
