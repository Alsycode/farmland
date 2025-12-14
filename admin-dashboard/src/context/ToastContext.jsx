

import React, { createContext, useContext, useCallback, useState } from 'react';

/**
 * Simple ToastContext
 * - push(message, { type = 'info', duration = 4000 })
 * - pop() to remove earliest
 *
 * This is intentionally small and dependency-free.
 */

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, opts = {}) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const toast = {
      id,
      message,
      type: opts.type || 'info',
      duration: typeof opts.duration === 'number' ? opts.duration : 4000
    };
    setToasts((s) => [...s, toast]);

    // auto-dismiss
    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.id !== id));
    }, toast.duration);
    return id;
  }, []);

  const remove = useCallback((id) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToasts() {
  return useContext(ToastContext);
}
