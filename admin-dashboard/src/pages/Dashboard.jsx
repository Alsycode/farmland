// path: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import analyticsService from '../services/analyticsService';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

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

  // neumorphism helpers
  const card =
    "bg-[#1e2229] rounded-2xl p-5 " +
    "shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#242a32]";

  const inset =
    "bg-[#1e2229] rounded-xl p-4 " +
    "shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  if (loading) {
    return (
      <div className="p-6 text-gray-400">
        <div>Loading dashboard…</div>
        <div className="mt-4"><LoadingSpinner /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-gray-300">
        <div className="text-red-400 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className={inset + " text-sm"}
        >
          Retry
        </button>
      </div>
    );
  }

  const totalProperties = stats?.totalProperties ?? stats?.propertiesCount ?? 0;
  const totalBookings = stats?.totalBookings ?? stats?.bookingsCount ?? 0;
  const totalUsers = stats?.totalUsers ?? stats?.usersCount ?? 0;
  const recentRevenue = stats?.recentRevenue ?? stats?.revenue ?? 0;

  return (
    <div className="text-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="text-sm text-gray-400">Overview</div>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={card}>
          <div className="text-sm text-gray-400">Total Properties</div>
          <div className="text-3xl font-semibold mt-2">{totalProperties}</div>
          <Link to="/properties" className="text-xs text-indigo-400 mt-3 inline-block">
            Manage properties →
          </Link>
        </div>

        <div className={card}>
          <div className="text-sm text-gray-400">Total Bookings</div>
          <div className="text-3xl font-semibold mt-2">{totalBookings}</div>
          <Link to="/bookings" className="text-xs text-indigo-400 mt-3 inline-block">
            View bookings →
          </Link>
        </div>

        <div className={card}>
          <div className="text-sm text-gray-400">Total Users</div>
          <div className="text-3xl font-semibold mt-2">{totalUsers}</div>
          <Link to="/admin/users" className="text-xs text-indigo-400 mt-3 inline-block">
            User management →
          </Link>
        </div>

        <div className={card}>
          <div className="text-sm text-gray-400">Recent Revenue</div>
          <div className="text-3xl font-semibold mt-2">
            ₹{Number(recentRevenue || 0).toLocaleString()}
          </div>
          <Link to="/analytics" className="text-xs text-indigo-400 mt-3 inline-block">
            View analytics →
          </Link>
        </div>
      </section>

      {/* Bottom section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className={card}>
          <h3 className="font-semibold mb-4">Quick actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/properties/new" className={inset + " text-indigo-400"}>
              Create property
            </Link>
            <Link to="/bookings" className={inset + " text-gray-300"}>
              Review bookings
            </Link>
            <Link to="/messages" className={inset + " text-gray-300"}>
              Open messages
            </Link>
          </div>
        </div>

        {/* Recent activity */}
        <div className={card}>
          <h3 className="font-semibold mb-4">Recent activity</h3>
          {Array.isArray(stats?.recent) && stats.recent.length ? (
            <ul className="space-y-3 text-sm">
              {stats.recent.map((r, i) => (
                <li key={i} className="text-gray-300">
                  <div className="font-medium">{r.title || r.action}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(r.date || r.createdAt || Date.now()).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400">No recent activity</div>
          )}
        </div>
      </section>
    </div>
  );
}
