// path: src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Sidebar now hides/shows certain links depending on user role:
 * - admin: sees Users & Analytics
 * - manager: sees Analytics
 * - user: limited view (no admin pages)
 */

export default function Sidebar() {
  const { user } = useAuth();

  const common = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/properties', label: 'Properties' },
    { to: '/bookings', label: 'Bookings' },
    { to: '/favorites', label: 'Favorites' },
    { to: '/messages', label: 'Messages' }
  ];

  const adminLinks = [
    { to: '/admin/users', label: 'Users' },
    { to: '/analytics', label: 'Analytics' }
  ];

  const managerLinks = [
    { to: '/analytics', label: 'Analytics' }
  ];

  const links = [...common];
  if (user?.role === 'admin') links.push(...adminLinks);
  else if (user?.role === 'manager') links.push(...managerLinks);

  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Farmland Admin</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`
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
