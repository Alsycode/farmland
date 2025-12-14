// path: src/pages/Search.jsx
import React, { useEffect, useState } from 'react';
import propertyService from '../services/propertyService';
import SearchForm from '../components/SearchForm';
import FiltersSidebar from '../components/FiltersSidebar';
import PropertyList from '../components/PropertyList';
import Pagination from '../components/Pagination';

/**
 * Search page - wired to GET /api/properties with server-side filters.
 * Query params used: page, limit, q, category, amenities (csv), minPrice, maxPrice, minArea, maxArea, sort
 *
 * Behavior:
 * - Filters are applied and sent to backend.
 * - Pagination controlled by backend meta: { page, totalPages, total }
 * - View toggle grid/list available.
 */

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

  // Build params for API
  function buildParams() {
    const params = { page, limit };
    if (q) params.q = q;
    if (filters.category) params.category = filters.category;
    if (filters.amenities) params.amenities = filters.amenities;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.minArea) params.minArea = filters.minArea;
    if (filters.maxArea) params.maxArea = filters.maxArea;
    return params;
  }

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters, q]);

  async function fetchList() {
    setLoading(true); setError(null);
    try {
      const params = buildParams();
      const res = await propertyService.list(params);
      // Backend common shapes: { ok: true, items, meta } or { items, meta } or array
      if (res.ok) {
        setItems(res.items || []);
        setMeta(res.meta || { page: params.page || 1, totalPages: 1, total: (res.items || []).length });
      } else if (Array.isArray(res)) {
        setItems(res);
        setMeta({ page: params.page || 1, totalPages: 1, total: res.length });
      } else {
        setItems(res.items || res.data || []);
        setMeta(res.meta || { page: params.page || 1, totalPages: 1, total: (res.items || res.data || []).length });
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  }

  function onSearch(qv) {
    setQ(qv);
    setPage(1);
  }

  function onApplyFilters(f) {
    setFilters(f);
    setPage(1);
  }

  function onResetFilters() {
    setFilters({});
    setPage(1);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <FiltersSidebar onApply={onApplyFilters} onReset={onResetFilters} initialFilters={filters} />
      </div>

      <div className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <SearchForm initialQuery={q} onSearch={onSearch} />
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">View</div>
            <button onClick={() => setView('grid')} className={`px-2 py-1 rounded ${view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>Grid</button>
            <button onClick={() => setView('list')} className={`px-2 py-1 rounded ${view === 'list' ? 'bg-indigo-600 text-white' : 'bg-white border'}`}>List</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          {loading ? (
            <div className="text-gray-500">Loading properties…</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <>
              <PropertyList items={items} view={view} />
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">Showing page {meta.page} of {meta.totalPages} — {meta.total} results</div>
                <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={(p) => setPage(p)} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
