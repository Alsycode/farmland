// src/components/SearchForm.jsx
import React, { useState } from 'react';

export default function SearchForm({ initialQuery = '', onSearch }) {
  const [value, setValue] = useState(initialQuery);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.(value.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full max-w-xl"
    >
      {/* Neumorphic search input */}
      <div
        className="
          flex-1 rounded-3xl
          bg-[#eef4ee]
          shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
          flex items-center px-4
        "
      >
        <input
          type="text"
          placeholder="Search by location, title, or keyword"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="
            w-full bg-transparent outline-none
            text-green-900 placeholder:text-green-500
            py-2.5
          "
        />
      </div>

      {/* Neumorphic search button */}
      <button
        type="submit"
        className="
          px-5 py-2.5 rounded-3xl
          bg-[#eef4ee] text-green-800 font-medium
          shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
          hover:shadow-[3px_3px_6px_#cfd8cf,-3px_-3px_6px_#ffffff]
          active:shadow-inner
          border border-green-200
          whitespace-nowrap
        "
      >
        Search
      </button>
    </form>
  );
}
