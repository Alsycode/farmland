// path: src/components/SearchForm.jsx
import React, { useState } from 'react';

/**
 * SearchForm - simple search input and submit button.
 * Props:
 *  - initialQuery
 *  - onSearch(query)
 */
export default function SearchForm({ initialQuery = '', onSearch }) {
  const [q, setQ] = useState(initialQuery);

  function submit(e) {
    e.preventDefault();
    onSearch(q);
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by location, title, address..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">Search</button>
    </form>
  );
}
