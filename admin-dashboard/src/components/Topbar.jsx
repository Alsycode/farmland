// path: src/components/Topbar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Topbar now hides logout when no user, and shows role badge.
 */
export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-gray-100">☰</button>
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-right">
              <div className="font-medium">{user.name || user.email}</div>
              <div className="text-xs text-gray-500">
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">{user.role}</span>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">Sign in</a>
        )}
      </div>
    </header>
  );
}
