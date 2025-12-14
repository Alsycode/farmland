// path: src/components/Topbar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Topbar with mobile menu button and responsive user info.
 */
export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b px-4 md:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <span className="sr-only">Open sidebar</span>
          ☰
        </button>

        <h1 className="text-base md:text-lg font-semibold truncate">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden sm:block text-right text-sm">
              <div className="font-medium truncate max-w-[160px]">
                {user.name || user.email}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                <span className="inline-flex px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">
                  {user.role}
                </span>
              </div>
            </div>

            {/* On very small screens, just show role chip */}
            <div className="sm:hidden">
              <span className="inline-flex px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs capitalize">
                {user.role}
              </span>
            </div>

            <button
              onClick={() => logout()}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs md:text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs md:text-sm"
          >
            Sign in
          </a>
        )}
      </div>
    </header>
  );
}
