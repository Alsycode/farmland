// path: src/pages/Properties.jsx
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import propertyService from '../services/propertyService';
import { buildQueryParams } from '../utils/pagination';

export default function Properties() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 12);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function fetchList() {
    setLoading(true);
    setError(null);
    try {
      const params = buildQueryParams({
        page,
        limit,
        q: searchParams.get('q'),
        sort: searchParams.get('sort')
      });
      const res = await propertyService.list(params);
      if (res.ok) {
        setItems(res.items || []);
        setMeta(res.meta || null);
      } else {
        setError(res.error || 'Failed to load properties');
      }
    } catch (err) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  function onSearch(e) {
    e.preventDefault();
    const sp = {};
    if (q) sp.q = q;
    sp.page = 1;
    setSearchParams(sp);
  }

  function goPage(p) {
    const sp = Object.fromEntries([...searchParams.entries()]);
    sp.page = p;
    setSearchParams(sp);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this property? This action cannot be undone.')) return;
    try {
      await propertyService.remove(id);
      // refresh list
      fetchList();
    } catch (err) {
      alert('Delete failed: ' + (err?.response?.data?.error || err.message));
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Properties</h2>
        {user && (user.role === 'admin' || user.role === 'manager') && (
          <button onClick={() => navigate('/properties/new')} className="px-3 py-2 bg-indigo-600 text-white rounded">
            Create
          </button>
        )}
      </div>

      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search properties..."
          className="border rounded px-3 py-2 flex-1"
        />
        <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">Search</button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div className="text-gray-500">Loading…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-gray-500">No properties found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Price</th>
                  <th className="p-2 border-b">Area</th>
                  <th className="p-2 border-b">Address</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b">Owner</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it._id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{it.title}</td>
                    <td className="p-2 border-b">₹{it.price?.toLocaleString()}</td>
                    <td className="p-2 border-b">{it.area} {it.unit}</td>
                    <td className="p-2 border-b">{it.address}</td>
                    <td className="p-2 border-b">{it.status}</td>
                    <td className="p-2 border-b">{it.owner?.name || it.owner?.email}</td>
                    <td className="p-2 border-b space-x-2">
                      <Link to={`/properties/${it._id}`} className="px-2 py-1 bg-gray-100 rounded">View</Link>
                      {(user?.role === 'admin' || user?.role === 'manager' || (user?.role === 'user' && user._id === it.owner?._id)) && (
                        <Link to={`/properties/${it._id}/edit`} className="px-2 py-1 bg-yellow-100 rounded">Edit</Link>
                      )}
                      {(user?.role === 'admin' || user?.role === 'manager' || (user?.role === 'user' && user._id === it.owner?._id)) && (
                        <button onClick={() => handleDelete(it._id)} className="px-2 py-1 bg-red-100 rounded text-red-700">Delete</button>
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
          <div className="text-sm text-gray-500">
            Page {meta.page} of {meta.totalPages} — {meta.total} results
          </div>
          <div className="flex gap-2">
            <button disabled={meta.page <= 1} onClick={() => goPage(meta.page - 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Prev</button>
            <button disabled={meta.page >= meta.totalPages} onClick={() => goPage(meta.page + 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
