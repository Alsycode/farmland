// path: src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import { useAuth } from '../context/AuthContext';

export default function Users() {
  const { user: me } = useAuth();
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await adminService.listUsers({ page, limit });
      if (res.ok) {
        setItems(res.items || []);
        setMeta(res.meta || null);
      } else {
        alert(res.error || 'Failed to load users');
      }
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(id, newRole) {
    if (!confirm(`Change role to "${newRole}"?`)) return;
    setSavingId(id);
    try {
      const res = await adminService.updateUser(id, { role: newRole });
      if (res.ok) {
        setItems(s => s.map(u => (u._id === id ? res.user : u)));
      } else alert(res.error || 'Failed to update role');
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setSavingId(null);
    }
  }

  async function toggleActive(id, current) {
    const target = !current;
    if (!confirm(`${target ? 'Activate' : 'Deactivate'} this user?`)) return;
    setSavingId(id);
    try {
      const res = await adminService.updateUser(id, { isActive: target });
      if (res.ok) setItems(s => s.map(u => (u._id === id ? res.user : u)));
      else alert(res.error || 'Failed to update active state');
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setSavingId(null);
    }
  }

  async function removeUser(id) {
    if (!confirm('Delete user permanently? This cannot be undone.')) return;
    if (id === me?._id) {
      alert('You cannot delete yourself.');
      return;
    }
    setSavingId(id);
    try {
      const res = await adminService.deleteUser(id);
      if (res.ok) fetchUsers();
      else alert(res.error || 'Failed to delete');
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setSavingId(null);
    }
  }

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
        <h2 className="text-2xl font-semibold">Users</h2>
        <div className="text-sm text-gray-400">
          {meta ? `${meta.total} users` : ''}
        </div>
      </div>

      {/* Table container */}
      <div className={card}>
        {loading ? (
          <div className="text-gray-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-gray-400">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400">
                <tr className="text-left">
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Role</th>
                  <th className="py-3 px-2">Active</th>
                  <th className="py-3 px-2">Joined</th>
                  <th className="py-3 px-2">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#14161a]">
                {items.map(u => (
                  <tr key={u._id} className="hover:bg-[#181b20]">
                    <td className="py-3 px-2">{u.name}</td>
                    <td className="py-3 px-2 text-gray-300">{u.email}</td>

                    <td className="py-3 px-2">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u._id, e.target.value)}
                        disabled={savingId === u._id}
                        className={inset + " text-gray-200 bg-transparent"}
                      >
                        <option value="user">user</option>
                        <option value="manager">manager</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>

                    <td className="py-3 px-2">
                      <button
                        onClick={() => toggleActive(u._id, u.isActive)}
                        disabled={savingId === u._id}
                        className={
                          inset +
                          " text-xs " +
                          (u.isActive ? "text-emerald-400" : "text-gray-400")
                        }
                      >
                        {u.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    <td className="py-3 px-2 text-gray-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-2">
                      <button
                        onClick={() => removeUser(u._id)}
                        disabled={savingId === u._id}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Delete
                      </button>
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
