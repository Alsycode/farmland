import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

export default function PropertyCard({ property }) {
  return (
    <Link to={`/properties/${property.id}`} className="group">
      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm">
            <FiHeart className="text-gray-500" />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-md font-semibold text-[#0f172a]">{property.title}</h3>
            {property.verified && (
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full flex-shrink-0">
                ✓ Verified
              </span>
            )}
          </div>

          <div className="mt-3">
            <div className="text-red-600 text-xs font-bold">{property.priceLabel}</div>
            <div className="text-sm text-gray-500 mt-2">{property.plotSize}</div>
            <div className="text-xs text-gray-400 mt-1">{property.address} {property.city ? property.city : ""}</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
