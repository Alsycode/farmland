// path: src/components/Topbar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-30
        px-4 md:px-6 py-3
        flex items-center justify-between
        bg-[#181b20] text-gray-200
        shadow-[0_6px_12px_#14161a]
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="
            md:hidden px-3 py-2 rounded-xl text-gray-300
            shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32]
            hover:text-gray-100
            transition
          "
        >
          ☰
        </button>

        <h1 className="text-base md:text-lg font-semibold tracking-wide">
          Admin Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* User info */}
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium truncate max-w-[160px]">
                {user.name || user.email}
              </div>
              <span
                className="
                  inline-flex mt-1 px-3 py-0.5 rounded-full
                  text-xs text-amber-400
                  shadow-[inset_2px_2px_4px_#14161a,inset_-2px_-2px_4px_#242a32]
                "
              >
                {user.role}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="
                px-4 py-1.5 rounded-xl text-xs md:text-sm
                text-red-400
                shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32]
                hover:shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]
                transition
              "
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="
              px-4 py-1.5 rounded-xl text-sm
              text-indigo-400
              shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32]
            "
          >
            Sign in
          </a>
        )}
      </div>
    </header>
  );
}
