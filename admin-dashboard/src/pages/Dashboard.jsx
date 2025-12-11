// path: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // populated in PART 7/8 using analytics service
    async function load() {
      // placeholder fetch; will be replaced with axios apiClient in PART 2
      try {
        const res = await fetch('/api/analytics/overview', { credentials: 'include' });
        if (res.ok) {
          const json = await res.json();
          if (json.ok) setStats(json.data || json.stats);
        }
      } catch (err) {
        // ignore for now
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      {stats ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total Properties</div>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total Bookings</div>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total Users</div>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">Loading stats…</div>
      )}
    </div>
  );
}
