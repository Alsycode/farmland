import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

export default function PropertyCard({ property }) {
  const img = property?.images?.[0]?.url || property?.image || null;

  return (
    <article
      className="
        rounded-2xl overflow-hidden
        bg-[#eef4ee]
        shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
        hover:shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
        transition
      "
    >
      <div className="relative">
        {img ? (
          <img src={img} alt={property.title} className="h-52 w-full object-cover" />
        ) : (
          <div className="h-52 flex items-center justify-center text-green-600">
            No image
          </div>
        )}

        <button
          className="
            absolute top-3 right-3 p-2 rounded-full
            bg-[#eef4ee]
            shadow-[2px_2px_4px_#cfd8cf,-2px_-2px_4px_#ffffff]
          "
        >
          <FiHeart className="text-green-700" />
        </button>
      </div>

      <div className="p-4">
        <Link
          to={`/properties/${property._id}`}
          className="block font-semibold text-lg hover:underline"
        >
          {property.title}
        </Link>

        <div className="mt-2 font-bold text-green-700">
          ₹{property.price?.toLocaleString() || '—'}
        </div>

        <div className="mt-2 text-sm text-green-700">
          {property.area} {property.unit}
        </div>

        <div className="text-sm text-green-600">
          {property.address}
        </div>
      </div>
    </article>
  );
}
