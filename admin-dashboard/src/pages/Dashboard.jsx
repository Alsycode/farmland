// path: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import analyticsService from '../services/analyticsService';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Dashboard - uses analyticsService.overview() to show high-level stats.
 * Shows quick links to main sections and handles loading/error states.
 */

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await analyticsService.overview();
        if (!mounted) return;
        if (res && res.ok) {
          // prefer res.data or res.stats depending on backend shape
          setStats(res.data || res.stats || res);
        } else {
          setError(res?.error || 'Failed to load dashboard stats');
        }
      } catch (err) {
        setError(err?.response?.data?.error || err.message || 'Network error');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-gray-500">Loading dashboard…</div>
        <div className="mt-4"><LoadingSpinner /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <div>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // safe defaults
  const totalProperties = stats?.totalProperties ?? stats?.propertiesCount ?? 0;
  const totalBookings = stats?.totalBookings ?? stats?.bookingsCount ?? 0;
  const totalUsers = stats?.totalUsers ?? stats?.usersCount ?? 0;
  const recentRevenue = stats?.recentRevenue ?? stats?.revenue ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-500">Overview</div>
      </div>

      <section className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Properties</div>
          <div className="text-2xl font-bold">{totalProperties}</div>
          <div className="mt-2 text-xs text-gray-500"><Link to="/properties" className="underline">Manage properties</Link></div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Bookings</div>
          <div className="text-2xl font-bold">{totalBookings}</div>
          <div className="mt-2 text-xs text-gray-500"><Link to="/bookings" className="underline">View bookings</Link></div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <div className="mt-2 text-xs text-gray-500"><Link to="/admin/users" className="underline">User management</Link></div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Recent Revenue</div>
          <div className="text-2xl font-bold">₹{Number(recentRevenue || 0).toLocaleString()}</div>
          <div className="mt-2 text-xs text-gray-500"><Link to="/analytics" className="underline">View analytics</Link></div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Quick actions</h3>
          <div className="flex flex-col gap-2">
            <Link to="/properties/new" className="px-3 py-2 bg-indigo-600 text-white rounded w-max">Create a property</Link>
            <Link to="/bookings" className="px-3 py-2 bg-gray-100 rounded w-max">Review bookings</Link>
            <Link to="/messages" className="px-3 py-2 bg-gray-100 rounded w-max">Open messages</Link>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Recent activity</h3>
          {/* Backend may provide recent activity list under stats.recent || stats.activities */}
          {Array.isArray(stats?.recent) && stats.recent.length ? (
            <ul className="space-y-2 text-sm">
              {stats.recent.map((r, i) => (
                <li key={i} className="border-b pb-2">
                  <div className="font-medium">{r.title || r.action}</div>
                  <div className="text-xs text-gray-500">{new Date(r.date || r.createdAt || Date.now()).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No recent activity</div>
          )}
        </div>
      </section>
    </div>
  );
}
