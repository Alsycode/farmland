// path: src/components/SmallPropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SmallPropertyCard - compact card used in dashboard lists
 */
export default function SmallPropertyCard({ p }) {
  const img = p?.images?.[0]?.url || p?.image || '';
  return (
    <div className="flex gap-3 items-center p-3 border rounded">
      <div className="w-20 h-14 bg-gray-100 overflow-hidden rounded">
        {img ? <img src={img} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>}
      </div>
      <div className="flex-1">
        <Link to={`/properties/${p._id}`} className="font-medium block">{p.title}</Link>
        <div className="text-xs text-gray-500">₹{p.price?.toLocaleString() || '—'}</div>
      </div>
    </div>
  );
}
