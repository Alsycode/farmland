// path: src/components/FiltersSidebar.jsx
import React, { useState } from 'react';

/**
 * FiltersSidebar - filter UI for category, amenities, price & area
 * Props:
 *  - onApply(filters)
 *  - onReset()
 *  - initialFilters: { category, amenities (array), minPrice, maxPrice, minArea, maxArea }
 *
 * Note: amenities entered as comma-separated tags.
 */
export default function FiltersSidebar({ onApply, onReset, initialFilters = {} }) {
  const [category, setCategory] = useState(initialFilters.category || '');
  const [amenities, setAmenities] = useState((initialFilters.amenities || []).join(', '));
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || '');
  const [minArea, setMinArea] = useState(initialFilters.minArea || '');
  const [maxArea, setMaxArea] = useState(initialFilters.maxArea || '');

  function apply() {
    const filters = {
      category: category || undefined,
      amenities: amenities ? amenities.split(',').map(s => s.trim()).filter(Boolean).join(',') : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      minArea: minArea || undefined,
      maxArea: maxArea || undefined
    };
    onApply(filters);
  }

  function reset() {
    setCategory(''); setAmenities(''); setMinPrice(''); setMaxPrice(''); setMinArea(''); setMaxArea('');
    onReset();
  }

  return (
    <aside className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Filters</h3>

      <div className="mb-3">
        <label className="text-xs text-gray-600">Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded px-2 py-1 mt-1">
          <option value="">Any</option>
          <option value="agriculture">Agriculture</option>
          <option value="orchard">Orchard</option>
          <option value="mixed">Mixed use</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-600">Amenities (comma separated)</label>
        <input value={amenities} onChange={e => setAmenities(e.target.value)} className="w-full border rounded px-2 py-1 mt-1" placeholder="water, electricity, road access" />
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-600">Min price (₹)</label>
          <input value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full border rounded px-2 py-1 mt-1" type="number" />
        </div>
        <div>
          <label className="text-xs text-gray-600">Max price (₹)</label>
          <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full border rounded px-2 py-1 mt-1" type="number" />
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-600">Min area</label>
          <input value={minArea} onChange={e => setMinArea(e.target.value)} className="w-full border rounded px-2 py-1 mt-1" type="number" />
        </div>
        <div>
          <label className="text-xs text-gray-600">Max area</label>
          <input value={maxArea} onChange={e => setMaxArea(e.target.value)} className="w-full border rounded px-2 py-1 mt-1" type="number" />
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button onClick={apply} className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded">Apply</button>
        <button onClick={reset} className="px-3 py-2 bg-gray-100 rounded">Reset</button>
      </div>
    </aside>
  );
}
