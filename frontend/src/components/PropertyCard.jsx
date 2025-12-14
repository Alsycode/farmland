// path: src/components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  const img = property?.images?.[0]?.url || property?.image || null;
  console.log("property",property)
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      {img ? <img src={img} alt={property.title} className="w-full h-44 object-cover" /> : <div className="h-44 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>}
      <div className="p-4">
        <Link to={`/properties/${property._id}`} className="font-semibold block">{property.title}</Link>
        <div className="text-sm text-gray-500">₹{property.price?.toLocaleString() || '—'} • {property.area || '—'} {property.unit || ''}</div>
        <div className="mt-2 text-xs text-gray-400">{property.address}</div>
      </div>
    </div>
  );
}
