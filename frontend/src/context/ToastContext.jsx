// path: src/context/ToastContext.jsx
import React, { createContext, useContext, useCallback, useState } from 'react';

/**
 * Minimal ToastContext for user-facing messages.
 * - push(message, { type = 'info', duration = 3500 })
 */
const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, opts = {}) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const toast = { id, message, type: opts.type || 'info', duration: opts.duration ?? 3500 };
    setToasts((t) => [...t, toast]);
    setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), toast.duration);
    return id;
  }, []);

  const remove = useCallback((id) => setToasts((t) => t.filter(x => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`max-w-sm px-4 py-2 rounded shadow ${t.type === 'error' ? 'bg-red-500 text-white' : t.type === 'success' ? 'bg-green-500 text-white' : 'bg-white text-gray-900'}`}>
            <div className="text-sm">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToasts() {
  return useContext(ToastContext);
}
