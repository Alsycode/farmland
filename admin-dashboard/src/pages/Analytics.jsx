// path: src/pages/Analytics.jsx
import React, { useEffect, useState } from 'react';
import analyticsService from '../services/analyticsService';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid
} from 'recharts';

/**
 * Analytics page:
 * - Fetches overview (counts)
 * - Fetches top viewed properties (top 10)
 * - Fetches bookings per property (top 10)
 * - Fetches revenue summary
 *
 * Uses Recharts for simple visualizations.
 */

export default function Analytics() {
  const [overview, setOverview] = useState(null);
  const [topViewed, setTopViewed] = useState([]);
  const [bookingsPerProperty, setBookingsPerProperty] = useState([]);
  const [revenueSummary, setRevenueSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    setError(null);
    try {
      const [ov, tv, bp, rev] = await Promise.all([
        analyticsService.overview(),
        analyticsService.topViewed(10),
        analyticsService.bookingsPerProperty(10),
        analyticsService.revenue()
      ]);
      if (ov.ok) setOverview(ov.data || ov);
      if (tv.ok) setTopViewed(tv.items || tv);
      if (bp.ok) setBookingsPerProperty(bp.items || bp);
      if (rev.ok) setRevenueSummary(rev.summary || rev);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Analytics</h2>

      {loading && <div className="text-gray-500">Loading analytics…</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {!loading && !error && (
        <>
          <section className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">Total Properties</div>
              <div className="text-2xl font-bold">{overview?.totalProperties ?? 0}</div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">Total Bookings</div>
              <div className="text-2xl font-bold">{overview?.totalBookings ?? 0}</div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-2xl font-bold">{overview?.totalUsers ?? 0}</div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Top Viewed Properties</h3>
                <div className="text-sm text-gray-500">Top {topViewed.length}</div>
              </div>
              {topViewed.length === 0 ? (
                <div className="text-gray-500">No data</div>
              ) : (
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={topViewed.map((t) => ({ name: t.title || 'untitled', views: t.views || 0 }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" name="Views" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Bookings per Property</h3>
                <div className="text-sm text-gray-500">Top {bookingsPerProperty.length}</div>
              </div>
              {bookingsPerProperty.length === 0 ? (
                <div className="text-gray-500">No data</div>
              ) : (
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={bookingsPerProperty.map((b) => ({ name: b.title || 'untitled', bookings: b.count || 0 }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" name="Bookings" fill="#059669" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">Revenue (confirmed bookings)</div>
                <div className="text-2xl font-bold">₹{(revenueSummary?.revenue || 0).toLocaleString()}</div>
                <div className="text-sm text-gray-500">Bookings counted: {revenueSummary?.bookingsCount ?? 0}</div>
              </div>
              <div>
                <button
                  onClick={() => {
                    // reload revenue for last 30 days as an example
                    const to = new Date().toISOString().slice(0, 10);
                    const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
                    analyticsService.revenue(from, to).then((res) => {
                      if (res.ok) setRevenueSummary(res.summary || res);
                      else alert(res.error || 'Failed to load revenue');
                    }).catch((err) => alert(err?.message || 'Network error'));
                  }}
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  Last 30 days
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
