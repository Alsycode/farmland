// path: src/components/FiltersSidebar.jsx
import React, { useState } from "react";

const LISTING_TYPES = [
  { key: "featured", label: "Featured" },
  { key: "trending", label: "Highly Recommended" },
  { key: "upcoming", label: "Recently Added" }
];

const AMENITIES = [
  { key: "water", label: "Water" },
  { key: "electricity", label: "Electricity" },
  { key: "road", label: "Road Access" },
  { key: "fencing", label: "Fencing" }
];

export default function FiltersSidebar({
  onApply,
  onReset,
  initialFilters = {}
}) {
  const [listingType, setListingType] = useState(initialFilters.listingType || []);
  const [amenities, setAmenities] = useState(initialFilters.amenities || []);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || "");
  const [minArea, setMinArea] = useState(initialFilters.minArea || "");
  const [maxArea, setMaxArea] = useState(initialFilters.maxArea || "");
  const [location, setLocation] = useState(initialFilters.location || "");

  function toggle(value, list, setter) {
    setter(
      list.includes(value)
        ? list.filter(v => v !== value)
        : [...list, value]
    );
  }

  function applyFilters() {
    onApply({
      listingType: listingType.length ? listingType : undefined,
      amenities: amenities.length ? amenities : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      minArea: minArea || undefined,
      maxArea: maxArea || undefined,
      location: location || undefined
    });
  }

  function resetFilters() {
    setListingType([]);
    setAmenities([]);
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setLocation("");
    onReset();
  }

  const inputClass = `
    w-full px-3 py-2 rounded-xl text-sm
    bg-[#eef4ee] text-green-900
    shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
    focus:outline-none
  `;

  return (
    <aside
      className="
        p-6 rounded-3xl bg-[#eef4ee]
        shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
        space-y-6
      "
    >
      <h3 className="font-semibold text-green-900 text-lg">Filters</h3>

      {/* CATEGORY */}
      <div>
        <p className="text-sm font-medium text-green-800 mb-2">Category</p>
        <div className="space-y-2">
          {LISTING_TYPES.map(t => (
            <label key={t.key} className="flex items-center gap-2 text-sm text-green-700">
              <input
                type="checkbox"
                checked={listingType.includes(t.key)}
                onChange={() => toggle(t.key, listingType, setListingType)}
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {/* AMENITIES */}
      <div>
        <p className="text-sm font-medium text-green-800 mb-2">Amenities</p>
        <div className="space-y-2">
          {AMENITIES.map(a => (
            <label key={a.key} className="flex items-center gap-2 text-sm text-green-700">
              <input
                type="checkbox"
                checked={amenities.includes(a.key)}
                onChange={() => toggle(a.key, amenities, setAmenities)}
              />
              {a.label}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <p className="text-sm font-medium text-green-800 mb-2">Price (₹)</p>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className={inputClass} />
          <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* LAND AREA */}
      <div>
        <p className="text-sm font-medium text-green-800 mb-2">Land Size (acres)</p>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" placeholder="Min" value={minArea} onChange={e => setMinArea(e.target.value)} className={inputClass} />
          <input type="number" placeholder="Max" value={maxArea} onChange={e => setMaxArea(e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* LOCATION */}
      <div>
        <p className="text-sm font-medium text-green-800 mb-2">Location</p>
        <input
          type="text"
          placeholder="City / District"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={applyFilters}
          className="flex-1 py-2 rounded-xl text-sm font-semibold bg-green-700 text-white shadow-[4px_4px_8px_#cfd8cf]"
        >
          Apply
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 py-2 rounded-xl text-sm bg-[#eef4ee] text-green-800 shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
