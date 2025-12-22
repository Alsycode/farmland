// path: src/pages/Search.jsx
import React, { useEffect, useState } from 'react';
import propertyService from '../services/propertyService';
import SearchForm from '../components/SearchForm';
import FiltersSidebar from '../components/FiltersSidebar';
import PropertyList from '../components/PropertyList';
import Pagination from '../components/Pagination';

export default function Search() {
  const [filters, setFilters] = useState({});
  const [q, setQ] = useState('');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================= FIXED PARAM BUILDER ================= */

  function buildParams() {
    const params = { page, limit };

    if (q) params.q = q;

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;

      // 🔑 CRITICAL FIX: serialize arrays
      if (Array.isArray(value)) {
        if (value.length) params[key] = value.join(',');
      } else {
        params[key] = value;
      }
    });

    return params;
  }

  /* ================= FETCH ================= */

  async function fetchList() {
    setLoading(true);
    setError(null);

    try {
      const res = await propertyService.list(buildParams());
      setItems(res.items || []);
      setMeta(res.meta || meta);
    } catch (err) {
      setError(err?.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, [page, filters, q]);

  return (
    <div className="bg-[#eef4ee] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* FILTERS */}
        <div>
          <FiltersSidebar
            initialFilters={filters}
            onApply={(f) => {
              setFilters(f);
              setPage(1);
            }}
            onReset={() => {
              setFilters({});
              setPage(1);
            }}
          />
        </div>

        {/* RESULTS */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <SearchForm
              initialQuery={q}
              onSearch={(v) => {
                setQ(v);
                setPage(1);
              }}
            />

            <div className="flex gap-2">
              {['grid', 'list'].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`
                    px-4 py-2 rounded-xl text-sm
                    ${view === v
                      ? 'bg-green-600 text-white'
                      : 'bg-[#eef4ee] text-green-800'}
                    shadow-[2px_2px_4px_#cfd8cf,-2px_-2px_4px_#ffffff]
                  `}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div
            className="
              bg-[#eef4ee] p-6 rounded-3xl
              shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
            "
          >
            {loading ? (
              <div className="text-green-700">Loading properties…</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <>
                <PropertyList items={items} view={view} />

                <div className="mt-6 flex justify-between items-center text-sm text-green-700">
                  <span>
                    Page {meta.page} of {meta.totalPages} — {meta.total} results
                  </span>
                  <Pagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    onPageChange={(p) => setPage(p)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
