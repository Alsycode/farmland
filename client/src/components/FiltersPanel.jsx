import React, { useMemo } from "react";
import statesData from "../data/states";
// Simple array of Indian states and UTs
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Lakshadweep",
  "Puducherry"
];
/**
 * Filters panel UI: tags, price slider (double-handle), states list scroll,
 * and city placeholder. Emits changes via callbacks.
 *
 * Props:
 *  - tags: array of tags available
 *  - states: array of state names
 *  - values: { search, tag, priceMin, priceMax, sort }
 *  - onChange: (patch) => void
 */
export default function FiltersPanel({ tags = ["Trending", "Featured", "upcoming"], states: statesProp = states, values = {}, onChange = () => {} }) {
  const { search = "", tag = "", priceMin = 10, priceMax = 100, sort = "low" } = values;

  // slider handlers: two inputs (min & max)
  const handleMinChange = (e) => {
    const v = Number(e.target.value);
    if (v <= priceMax) onChange({ priceMin: v });
  };
  const handleMaxChange = (e) => {
    const v = Number(e.target.value);
    if (v >= priceMin) onChange({ priceMax: v });
  };
console.log("states",states)
  return (
    <aside className="col-span-12 lg:col-span-3">
      <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Filters</h4>
          <button className="text-sm text-red-500" onClick={() => onChange({ search: "", tag: "", priceMin: 10, priceMax: 500 })}>
            Clear all
          </button>
        </div>

        {/* Search input */}
        <div className="mb-4">
          <input
            value={search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search"
            className="w-full border border-gray-200 rounded-md px-3 py-2"
          />
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Tags</div>
            <button className="text-sm text-gray-400" onClick={() => onChange({ tag: "" })}>Clear</button>
          </div>
          <div className="space-y-2">
            {tags.map((t) => (
              <label key={t} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="tag"
                  checked={tag === t}
                  onChange={() => onChange({ tag: t })}
                  className="accent-red-400"
                />
                <span className="text-sm">{t}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <div className="text-sm font-medium mb-3">Price Range</div>

          <div className="px-1">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10"
                max="100"
                value={priceMin}
                onChange={handleMinChange}
                className="w-full"
              />
            </div>
            {/* <div className="flex items-center gap-2 mt-2">
              <input
                type="range"
                min="10"
                max="500"
                value={priceMax}
                onChange={handleMaxChange}
                className="w-full"
              />
            </div> */}

            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>₹{priceMin}L</span>
              <span>₹{priceMax}L</span>
            </div>
          </div>
        </div>

        {/* State list */}
        <div className="mb-6">
          <div className="text-sm font-medium mb-3">State</div>
          <div className="max-h-44 overflow-auto pr-2">
            {states.map((s) => (
              <label key={s} className="flex items-center gap-3 py-2">
                <input type="radio" name="state" onChange={() => onChange({ state: s })} className="accent-red-400"/>
                <span className="text-sm">{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* City placeholder */}
        <div>
          <div className="text-sm font-medium mb-2">City</div>
          <div className="text-sm text-gray-400 bg-gray-50 px-3 py-2 rounded-md">Select a state to view cities</div>
        </div>
      </div>
    </aside>
  );
}
