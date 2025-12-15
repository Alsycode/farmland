// path: src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ onLinkClick }) {
  const { user } = useAuth();

  const common = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/properties', label: 'Properties' },
    { to: '/bookings', label: 'Bookings' },
    { to: '/favorites', label: 'Favorites' },
    { to: '/messages', label: 'Messages' },
  ];

  const adminLinks = [
    { to: '/admin/users', label: 'Users' },
    { to: '/analytics', label: 'Analytics' },
  ];

  const managerLinks = [{ to: '/analytics', label: 'Analytics' }];

  const links = [...common];
  if (user?.role === 'admin') links.push(...adminLinks);
  else if (user?.role === 'manager') links.push(...managerLinks);

  return (
    <aside
      className="
        h-full w-64 flex flex-col
        bg-[#181b20]
        shadow-[6px_0_12px_#14161a,-6px_0_12px_#242a32]
        text-gray-200
      "
    >
      {/* Header */}
      <div className="p-6">
        <h2 className="text-lg font-semibold tracking-wide">
          Farmland Admin
        </h2>
      </div>

      {/* Navigation */}
      <nav className="px-4 flex-1 overflow-y-auto">
        <ul className="space-y-3">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={onLinkClick}
                className={({ isActive }) =>
                  `
                  block px-4 py-2 rounded-xl text-sm transition-all
                  ${
                    isActive
                      ? `
                        text-amber-400
                        shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]
                      `
                      : `
                        text-gray-300
                        shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32]
                        hover:text-gray-100
                      `
                  }
                  `
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
