// path: src/components/PropertyCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Building2, MapPin } from "lucide-react";

/* ================= CARD REVEAL ================= */

const cardReveal = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function PropertyCard({ property }) {
  const image =
    property.images?.[0]?.url || "/Farmland-Ownership.jpg";

  return (
    <motion.div
      variants={cardReveal}
      className="
        relative group
        bg-white rounded-3xl
        border border-[#e6ece6]
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* Accent border (top-right like reference) */}
      <span className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#1f4d46] rounded-tr-3xl pointer-events-none" />

      {/* ================= IMAGE ================= */}
      <div className="relative h-[200px] rounded-t-3xl overflow-hidden">
        <img
          src={image}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Wishlist */}
        <button
          className="
            absolute top-3 right-3
            w-9 h-9 rounded-xl
            bg-white
            flex items-center justify-center
            border border-[#e6ece6]
          "
        >
          <Heart size={16} className="text-[#1f4d46]" />
        </button>

        {/* Featured badge */}
        {property.listingType?.includes("featured") && (
          <span className="absolute top-3 left-3 bg-[#1f4d46] text-white text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#0f2f2a] leading-snug">
          <Link to={`/properties/${property._id}`}>
            {property.title}
          </Link>
        </h3>

        <div className="space-y-2 text-sm text-[#4b6b63]">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5" />
            <span>{property.address}</span>
          </div>

          {property.developer && (
            <div className="flex items-center gap-2">
              <Building2 size={16} />
              <span>{property.developer}</span>
            </div>
          )}
        </div>

        <div className="pt-3">
          <div className="text-2xl font-bold text-[#0f2f2a]">
            ₹{formatPrice(property.price)}
            <span className="text-sm font-medium text-[#4b6b63] ml-1">
              onwards
            </span>
          </div>
        </div>

        {property.area && (
          <div className="pt-1 text-sm text-[#4b6b63]">
            🌱 Project Area — {property.area} {property.unit || "Acre"}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ================= HELPERS ================= */

function formatPrice(price) {
  if (!price) return "—";
  if (price >= 10000000) return (price / 10000000).toFixed(2) + "Cr";
  if (price >= 100000) return (price / 100000).toFixed(2) + "L";
  return price.toLocaleString();
}
