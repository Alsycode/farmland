// path: src/components/Pagination.jsx
import React from 'react';

/**
 * Simple pagination control.
 * Props:
 *  - page, totalPages, onPageChange
 */
export default function Pagination({ page = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  // compact pagination: show up to 5 pages
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center gap-2 mt-4">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Prev</button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${p === page ? 'bg-indigo-600 text-white' : 'bg-white border'}`}
        >
          {p}
        </button>
      ))}
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Next</button>
    </div>
  );
}
