// path: src/components/ConfirmModal.jsx
import React from 'react';

/**
 * Very small confirm modal component using native confirm by default.
 * Kept simple: if you pass `visible`, it shows a basic overlay; else falls back to window.confirm.
 */
export default function ConfirmModal({ visible, title = 'Confirm', message, onConfirm, onCancel }) {
  if (!visible) {
    // fallback to synchronous confirm if not using overlay
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 bg-gray-100 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-1 bg-red-500 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
}
