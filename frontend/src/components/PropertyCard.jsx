import React from "react";
import { Link } from "react-router-dom";
import { Heart, Building2, MapPin } from "lucide-react";

export default function PropertyCard({ property }) {
  const image =
    property.images?.[0]?.url || "/Farmland-Ownership.jpg";

  return (
    <div
      className="
        bg-[#eef4ee] rounded-3xl overflow-hidden
        shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
        transition-transform duration-300 hover:-translate-y-1
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={image}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Category strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm font-semibold text-center py-1">
          FARMLAND
        </div>

        {/* Sponsored badge */}
        {property.listingType?.includes("featured") && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-lg">
            SPONSORED
          </span>
        )}

        {/* Wishlist */}
        <button
          className="
            absolute bottom-3 right-3
            w-10 h-10 rounded-full
            bg-[#eef4ee]
            flex items-center justify-center
            shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
          "
        >
          <Heart size={18} className="text-gray-600" />
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-green-900 leading-snug">
          <Link to={`/properties/${property._id}`}>
            {property.title}
          </Link>
        </h3>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-green-700">
          <MapPin size={16} className="mt-0.5" />
          <span>{property.address}</span>
        </div>

        {/* Developer */}
        {property.developer && (
          <div className="flex items-center gap-2 text-sm text-green-700">
            <Building2 size={16} />
            <span>{property.developer}</span>
          </div>
        )}

        {/* Price */}
        <div className="pt-2">
          <div className="text-2xl font-bold text-green-900">
            ₹{formatPrice(property.price)}
            <span className="text-sm font-medium text-green-700 ml-1">
              Onwards
            </span>
          </div>
        </div>

        {/* Project area */}
        {property.area && (
          <div className="flex items-center gap-2 text-sm text-green-700 pt-1">
            🌱 Project Area – {property.area} {property.unit || "Acre"}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function formatPrice(price) {
  if (!price) return "—";
  if (price >= 10000000) return (price / 10000000).toFixed(2) + "Cr";
  if (price >= 100000) return (price / 100000).toFixed(2) + "L";
  return price.toLocaleString();
}
