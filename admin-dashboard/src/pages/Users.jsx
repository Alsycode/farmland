// path: src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import { useAuth } from '../context/AuthContext';

/**
 * Users admin page:
 * - Fetches /api/admin/users?page=1&limit=20
 * - Allows role change (PUT /api/admin/users/:id with { role })
 * - Allows activate/deactivate (PUT with { isActive })
 * - Allows delete (DELETE /api/admin/users/:id)
 *
 * Note: This page is protected by RoleGuard in App.jsx (admin only).
 */

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
        // update local list
        setItems((s) => s.map(u => (u._id === id ? res.user : u)));
      } else {
        alert(res.error || 'Failed to update role');
      }
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
      if (res.ok) setItems((s) => s.map(u => (u._id === id ? res.user : u)));
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
      if (res.ok) {
        // refresh
        fetchUsers();
      } else {
        alert(res.error || 'Failed to delete');
      }
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <div className="text-sm text-gray-500">{meta ? `${meta.total} users` : ''}</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div className="text-gray-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-2 border-b">Name</th>
                  <th className="p-2 border-b">Email</th>
                  <th className="p-2 border-b">Role</th>
                  <th className="p-2 border-b">Active</th>
                  <th className="p-2 border-b">Joined</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{u.name}</td>
                    <td className="p-2 border-b">{u.email}</td>
                    <td className="p-2 border-b">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u._id, e.target.value)}
                        className="border rounded px-2 py-1"
                        disabled={savingId === u._id}
                      >
                        <option value="user">user</option>
                        <option value="manager">manager</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="p-2 border-b">
                      <button
                        onClick={() => toggleActive(u._id, u.isActive)}
                        className={`px-2 py-1 rounded ${u.isActive ? 'bg-green-100' : 'bg-gray-100'}`}
                        disabled={savingId === u._id}
                      >
                        {u.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-2 border-b">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="p-2 border-b">
                      <button
                        onClick={() => removeUser(u._id)}
                        className="px-2 py-1 bg-red-100 rounded text-red-600"
                        disabled={savingId === u._id}
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

      {meta && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Page {meta.page} of {meta.totalPages} — {meta.total} results
          </div>
          <div className="flex gap-2">
            <button disabled={meta.page <= 1} onClick={() => setPage(meta.page - 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Prev</button>
            <button disabled={meta.page >= meta.totalPages} onClick={() => setPage(meta.page + 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
