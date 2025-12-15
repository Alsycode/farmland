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
        sort: searchParams.get('sort'),
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
      fetchList();
    } catch (err) {
      alert('Delete failed: ' + (err?.response?.data?.error || err.message));
    }
  }

  /* ================= NEUMORPHISM HELPERS ================= */

  const card =
    "bg-[#1e2229] rounded-2xl p-5 " +
    "shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#242a32]";

  const inset =
    "bg-[#1e2229] rounded-xl px-4 py-2 outline-none " +
    "shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  const button =
    "rounded-xl px-4 py-2 text-indigo-400 transition " +
    "shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32] " +
    "hover:shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  return (
    <div className="text-gray-200">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Properties</h2>
        {user && (user.role === 'admin' || user.role === 'manager') && (
          <button
            onClick={() => navigate('/properties/new')}
            className={button}
          >
            Create
          </button>
        )}
      </div>

      {/* ================= SEARCH FORM ================= */}
      <form onSubmit={onSearch} className="flex gap-4 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search properties..."
          className={`${inset} flex-1 text-gray-200 bg-transparent`}
        />
        <button type="submit" className={button}>
          Search
        </button>
      </form>

      {/* ================= TABLE ================= */}
      <div className={card}>
        {loading ? (
          <div className="text-gray-400">Loading…</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-gray-400">No properties found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400">
                <tr className="text-left">
                  <th className="py-3 px-2">Title</th>
                  <th className="py-3 px-2">Price</th>
                  <th className="py-3 px-2">Area</th>
                  <th className="py-3 px-2">Address</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Owner</th>
                  <th className="py-3 px-2">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#14161a]">
                {items.map((it) => (
                  <tr key={it._id} className="hover:bg-[#181b20]">
                    <td className="py-3 px-2">{it.title}</td>
                    <td className="py-3 px-2 text-gray-300">
                      ₹{it.price?.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-gray-300">
                      {it.area} {it.unit}
                    </td>
                    <td className="py-3 px-2 text-gray-300">{it.address}</td>
                    <td className="py-3 px-2 text-amber-400">{it.status}</td>
                    <td className="py-3 px-2 text-gray-300">
                      {it.owner?.name || it.owner?.email}
                    </td>
                    <td className="py-3 px-2 space-x-3">
                      <Link
                        to={`/properties/${it._id}`}
                        className="text-xs text-indigo-400 hover:underline"
                      >
                        View
                      </Link>

                      {(user?.role === 'admin' ||
                        user?.role === 'manager' ||
                        (user?.role === 'user' &&
                          user._id === it.owner?._id)) && (
                        <Link
                          to={`/properties/${it._id}/edit`}
                          className="text-xs text-yellow-400 hover:underline"
                        >
                          Edit
                        </Link>
                      )}

                      {(user?.role === 'admin' ||
                        user?.role === 'manager' ||
                        (user?.role === 'user' &&
                          user._id === it.owner?._id)) && (
                        <button
                          onClick={() => handleDelete(it._id)}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Delete
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

      {/* ================= PAGINATION ================= */}
      {meta && (
        <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
          <div>
            Page {meta.page} of {meta.totalPages} — {meta.total} results
          </div>
          <div className="flex gap-3">
            <button
              disabled={meta.page <= 1}
              onClick={() => goPage(meta.page - 1)}
              className={`${button} disabled:opacity-40`}
            >
              Prev
            </button>
            <button
              disabled={meta.page >= meta.totalPages}
              onClick={() => goPage(meta.page + 1)}
              className={`${button} disabled:opacity-40`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
s