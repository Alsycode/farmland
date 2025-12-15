import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

/**
 * PropertyCard
 * - VISUAL REFACTOR ONLY
 * - Matches Homepage B card UI exactly
 * - Logic, props, routing unchanged
 */

export default function PropertyCard({ property }) {
  const img = property?.images?.[0]?.url || property?.image || null;

  return (
    <article className="w-full rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition">

      {/* IMAGE */}
      <div className="relative">
        {img ? (
          <img
            src={img}
            alt={property.title}
            className="w-full h-36 sm:h-44 md:h-52 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-36 sm:h-44 md:h-52 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}

        {/* HEART ICON */}
        <button
          type="button"
          aria-label="Add to favorites"
          className="
            absolute top-3 right-3
            bg-white/90 backdrop-blur-sm
            p-2 sm:p-2.5
            rounded-full shadow-sm
            hover:bg-white transition
          "
        >
          <FiHeart size={18} className="text-gray-600" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4">
        <Link
          to={`/properties/${property._id}`}
          className="block font-semibold text-base sm:text-lg md:text-xl text-gray-800 leading-snug hover:underline"
        >
          {property.title}
        </Link>

        <div className="mt-2 font-bold text-accent text-sm sm:text-base md:text-lg">
          ₹{property.price?.toLocaleString() || '—'}
        </div>

        <div className="mt-3 text-xs sm:text-sm text-gray-500">
          {property.area || '—'} {property.unit || ''}
        </div>

        <div className="text-xs sm:text-sm text-gray-500">
          {property.address}
        </div>
      </div>

    </article>
  );
}
