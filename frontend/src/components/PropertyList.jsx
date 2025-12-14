// path: src/components/PropertyList.jsx
import React from 'react';
import PropertyCard from './PropertyCard';

/**
 * PropertyList shows properties in grid or list view.
 * Props:
 *  - items: array of properties
 *  - view: 'grid'|'list'
 */
export default function PropertyList({ items = [], view = 'grid' }) {
  if (!items.length) {
    return <div className="text-gray-500">No properties found.</div>;
  }

  if (view === 'list') {
    return (
      <div className="space-y-4">
        {items.map(p => (
          <div key={p._id} className="bg-white rounded shadow p-4 flex gap-4">
            <div className="w-48">
              <img className="w-full h-32 object-cover rounded" src={p.images?.[0]?.url || ''} alt={p.title} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <div className="text-sm text-gray-600">₹{p.price?.toLocaleString()} • {p.area} {p.unit}</div>
              <div className="mt-2 text-gray-700">{p.description ? p.description.slice(0, 180) + (p.description.length > 180 ? '…' : '') : ''}</div>
            </div>
            <div className="flex flex-col gap-2">
              <a href={`/properties/${p._id}`} className="px-3 py-2 bg-indigo-600 text-white rounded text-sm">View</a>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(p => <PropertyCard key={p._id} property={p} />)}
    </div>
  );
}
