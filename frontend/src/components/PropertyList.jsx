import React from 'react';
import PropertyCard from './PropertyCard';

export default function PropertyList({ items = [], view = 'grid' }) {
  if (!items.length) {
    return <div className="text-green-700">No properties found.</div>;
  }

  if (view === 'list') {
    return (
      <div className="space-y-6">
        {items.map(p => (
          <div
            key={p._id}
            className="
              flex gap-6 p-5 rounded-2xl bg-[#eef4ee]
              shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
            "
          >
            <img
              src={p.images?.[0]?.url}
              alt={p.title}
              className="w-48 h-32 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg text-green-900">
                {p.title}
              </h3>
              <div className="text-sm text-green-700">
                ₹{p.price?.toLocaleString()} • {p.area} {p.unit}
              </div>
              <p className="mt-2 text-green-800 text-sm">
                {p.description?.slice(0, 160)}
              </p>
            </div>

            <a
              href={`/properties/${p._id}`}
              className="
                self-start px-4 py-2 rounded-xl text-white text-sm
                bg-green-600
                shadow-[2px_2px_4px_#9fbfa2,-2px_-2px_4px_#dff1e2]
              "
            >
              View
            </a>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(p => <PropertyCard key={p._id} property={p} />)}
    </div>
  );
}
