import React, { useState } from 'react';

export default function FiltersSidebar({ onApply, onReset, initialFilters = {} }) {
  const [category, setCategory] = useState(initialFilters.category || '');
  const [amenities, setAmenities] = useState((initialFilters.amenities || []).join(', '));
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || '');
  const [minArea, setMinArea] = useState(initialFilters.minArea || '');
  const [maxArea, setMaxArea] = useState(initialFilters.maxArea || '');

  const inputClass = `
    w-full px-3 py-2 rounded-xl text-sm
    bg-[#eef4ee] text-green-900
    shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
    focus:outline-none
  `;

  function apply() {
    onApply({
      category: category || undefined,
      amenities: amenities || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      minArea: minArea || undefined,
      maxArea: maxArea || undefined,
    });
  }

  return (
    <aside
      className="
        p-6 rounded-3xl bg-[#eef4ee]
        shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
      "
    >
      <h3 className="font-semibold text-green-900 mb-4">Filters</h3>

      <div className="space-y-4 text-sm">
        <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
          <option value="">Any category</option>
          <option value="agriculture">Agriculture</option>
          <option value="orchard">Orchard</option>
          <option value="mixed">Mixed use</option>
          <option value="commercial">Commercial</option>
        </select>

        <input
          placeholder="Amenities (comma separated)"
          value={amenities}
          onChange={e => setAmenities(e.target.value)}
          className={inputClass}
        />

        <div className="grid grid-cols-2 gap-3">
          <input type="number" placeholder="Min price" value={minPrice} onChange={e => setMinPrice(e.target.value)} className={inputClass} />
          <input type="number" placeholder="Max price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input type="number" placeholder="Min area" value={minArea} onChange={e => setMinArea(e.target.value)} className={inputClass} />
          <input type="number" placeholder="Max area" value={maxArea} onChange={e => setMaxArea(e.target.value)} className={inputClass} />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={apply}
            className="
              flex-1 py-2 rounded-xl text-white text-sm
              bg-green-600
              shadow-[2px_2px_4px_#9fbfa2,-2px_-2px_4px_#dff1e2]
            "
          >
            Apply
          </button>
          <button
            onClick={onReset}
            className="
              px-4 py-2 rounded-xl text-green-800
              bg-[#eef4ee]
              shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
            "
          >
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
}
