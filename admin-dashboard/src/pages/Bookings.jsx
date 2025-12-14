// path: src/pages/Bookings.jsx
import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

/**
 * Bookings page:
 * - Lists bookings (for users: own bookings; for manager/admin: all)
 * - Managers/Admins can change status to confirmed/rejected
 * - Users can cancel their own bookings
 */
export default function Bookings() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterStatus]);

  async function fetchList() {
    setLoading(true);
    try {
      const params = { page, limit };
      if (filterStatus) params.status = filterStatus;
      const res = await bookingService.list(params);
      if (res.ok) {
        setItems(res.items || []);
        setMeta(res.meta || null);
      } else {
        alert(res.error || 'Failed to load bookings');
      }
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(id, status) {
    if (!confirm(`Change status to ${status}?`)) return;
    try {
      const res = await bookingService.update(id, { status });
      if (res.ok) {
        fetchList();
      } else {
        alert(res.error || 'Failed');
      }
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    }
  }

  async function cancelBooking(id) {
    if (!confirm('Cancel booking?')) return;
    try {
      const res = await bookingService.update(id, { status: 'cancelled' });
      if (res.ok) fetchList();
      else alert(res.error || 'Failed to cancel');
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Bookings</h2>
        <div className="flex items-center gap-2">
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="border rounded px-2 py-1">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div className="text-gray-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-gray-500">No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="p-2 border-b">Property</th>
                  <th className="p-2 border-b">User</th>
                  <th className="p-2 border-b">Preferred</th>
                  <th className="p-2 border-b">Message</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(b => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{b.property?.title || b.property}</td>
                    <td className="p-2 border-b">{b.user?.name || b.user?.email}</td>
                    <td className="p-2 border-b">{new Date(b.preferredDate).toLocaleString()} {b.preferredTime || ''}</td>
                    <td className="p-2 border-b">{b.message}</td>
                    <td className="p-2 border-b">{b.status}</td>
                    <td className="p-2 border-b space-x-2">
                      {user && (user.role === 'admin' || user.role === 'manager') && b.status !== 'confirmed' && (
                        <button onClick={() => changeStatus(b._id, 'confirmed')} className="px-2 py-1 bg-green-100 rounded">Confirm</button>
                      )}
                      {user && (user.role === 'admin' || user.role === 'manager') && b.status !== 'rejected' && (
                        <button onClick={() => changeStatus(b._1d || b._id, 'rejected')} className="px-2 py-1 bg-yellow-100 rounded">Reject</button>
                      )}
                      {user && user.role === 'user' && b.user && b.user._id === user._id && b.status !== 'cancelled' && (
                        <button onClick={() => cancelBooking(b._id)} className="px-2 py-1 bg-red-100 rounded text-red-600">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {meta && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">Page {meta.page} of {meta.totalPages} — {meta.total} results</div>
          <div className="flex gap-2">
            <button disabled={meta.page <= 1} onClick={() => setPage(meta.page - 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Prev</button>
            <button disabled={meta.page >= meta.totalPages} onClick={() => setPage(meta.page + 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
