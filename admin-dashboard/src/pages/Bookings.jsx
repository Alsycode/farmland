// path: src/pages/Bookings.jsx
import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

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
      if (res.ok) fetchList();
      else alert(res.error || 'Failed');
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

  /* neumorphism helpers */
  const card =
    "bg-[#1e2229] rounded-2xl p-5 " +
    "shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#242a32]";

  const inset =
    "bg-[#1e2229] rounded-xl px-3 py-2 " +
    "shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  return (
    <div className="text-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Bookings</h2>

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1);
          }}
          className={inset + " text-sm text-gray-200 bg-transparent"}
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className={card}>
        {loading ? (
          <div className="text-gray-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-gray-400">No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400">
                <tr className="text-left">
                  <th className="py-3 px-2">Property</th>
                  <th className="py-3 px-2">User</th>
                  <th className="py-3 px-2">Preferred</th>
                  <th className="py-3 px-2">Message</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#14161a]">
                {items.map((b) => (
                  <tr key={b._id} className="hover:bg-[#181b20]">
                    <td className="py-3 px-2">
                      {b.property?.title || b.property}
                    </td>
                    <td className="py-3 px-2 text-gray-300">
                      {b.user?.name || b.user?.email}
                    </td>
                    <td className="py-3 px-2 text-gray-400">
                      {new Date(b.preferredDate).toLocaleString()}
                      {b.preferredTime ? ` ${b.preferredTime}` : ''}
                    </td>
                    <td className="py-3 px-2 text-gray-300">
                      {b.message}
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-xs text-amber-400">
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 space-x-2">
                      {user &&
                        (user.role === 'admin' || user.role === 'manager') &&
                        b.status !== 'confirmed' && (
                          <button
                            onClick={() =>
                              changeStatus(b._id, 'confirmed')
                            }
                            className="text-xs text-emerald-400 hover:underline"
                          >
                            Confirm
                          </button>
                        )}

                      {user &&
                        (user.role === 'admin' || user.role === 'manager') &&
                        b.status !== 'rejected' && (
                          <button
                            onClick={() =>
                              changeStatus(b._id, 'rejected')
                            }
                            className="text-xs text-yellow-400 hover:underline"
                          >
                            Reject
                          </button>
                        )}

                      {user &&
                        user.role === 'user' &&
                        b.user &&
                        b.user._id === user._id &&
                        b.status !== 'cancelled' && (
                          <button
                            onClick={() => cancelBooking(b._id)}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta && (
        <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
          <div>
            Page {meta.page} of {meta.totalPages} — {meta.total} results
          </div>
          <div className="flex gap-3">
            <button
              disabled={meta.page <= 1}
              onClick={() => setPage(meta.page - 1)}
              className={inset + " disabled:opacity-40"}
            >
              Prev
            </button>
            <button
              disabled={meta.page >= meta.totalPages}
              onClick={() => setPage(meta.page + 1)}
              className={inset + " disabled:opacity-40"}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
