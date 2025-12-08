import React, { useMemo, useState } from "react";
import propertiesData from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import FiltersPanel from "../components/FiltersPanel";
import SidebarAd from "../components/SidebarAd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiChevronDown } from "react-icons/fi";

export default function PropertiesList() {
  // filter & control state
  const [filters, setFilters] = useState({
    search: "",
    tag: "",
    priceMin: 10,
    priceMax: 500,
    state: "",
    sort: "low" // 'low' | 'high'
  });

  // helper: unique states list
  const states = useMemo(
    () => Array.from(new Set(propertiesData.map((p) => p.state))).sort(),
    []
  );

  // apply filters to data
 const filtered = useMemo(() => {
  const q = filters.search.trim().toLowerCase();
  let arr = propertiesData.filter((p) => {
    // price filter
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;

    // state filter
    if (filters.state && p.state !== filters.state) return false;

    // 🔴 TAG FILTER
    if (filters.tag && p.tag !== filters.tag) return false;
    // if using array: if (filters.tag && !p.tags?.includes(filters.tag)) return false;

    // search filter
    if (q) {
      return (
        p.title.toLowerCase().includes(q) ||
        (p.city && p.city.toLowerCase().includes(q)) ||
        (p.state && p.state.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // sort
  arr = arr.sort((a, b) => {
    if (filters.sort === "low") return a.price - b.price;
    return b.price - a.price;
  });

  return arr;
}, [filters]);


  // update patch helper
  const update = (patch) => setFilters((s) => ({ ...s, ...patch }));
console.log("filters",filters)
console.log("filtered",filtered)
  return (
    <div className="min-h-screen bg-[#f8fafc]">


      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* left filters */}
          <FiltersPanel tags={["Trending","Featured","upcoming"]} states={states} values={filters} onChange={update} />

          {/* main content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4 w-full">
                <div className="flex-1">
                  <input
                    value={filters.search}
                    onChange={(e) => update({ search: e.target.value })}
                    placeholder="Search"
                    className="w-full border border-gray-200 rounded-md px-4 py-3"
                  />
                </div>

                <div>
                  <select
                    value={filters.sort}
                    onChange={(e) => update({ sort: e.target.value })}
                    className="border border-gray-200 rounded-md px-4 py-3"
                  >
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="text-gray-600 hidden md:block">
                {filtered.length} Properties Available
              </div>
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>

            {/* bottom content: "you have seen all properties" and promo images align as per screenshots */}
            <div className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="col-span-1 md:col-span-1"></div>

                <div className="col-span-1 md:col-span-1">
                  <img src="/add.png" alt="promo" className="w-full rounded-md shadow-sm"/>
                </div>

                <div className="col-span-1 md:col-span-1">
                  <div className="text-center text-gray-500">You have seen all properties</div>
                </div>
              </div>
            </div>
          </div>

          {/* right sticky sidebar (on large screens this will be visually to the right of grid) */}
          <aside className="hidden lg:block col-span-12 lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <SidebarAd />
            </div>
          </aside>
        </div>
      </main>


    </div>
  );
}
