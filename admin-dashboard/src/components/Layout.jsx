// path: src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
        min-h-screen flex
        bg-[#181b20] text-gray-200
      "
    >
      {/* ================= Desktop Sidebar ================= */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* ================= Mobile Sidebar ================= */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar panel */}
          <div
            className="
              relative z-50 w-64 h-full
              bg-[#1e2229]
              shadow-[6px_0_12px_#14161a,-6px_0_12px_#242a32]
            "
          >
            <Sidebar onLinkClick={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(v => !v)} />

        <main
          className="
            flex-1 overflow-auto p-6
            bg-[#181b20]
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
