import React from "react";

/**
 * AmenitiesSection with image icons stored in /public/icons/
 * - items: array of strings or { label, iconPath }
 * - If iconPath missing, the component automatically loads /public/icons/<slug>.png
 * - If icon doesn't exist, a fallback SVG is shown.
 */

export default function AmenitiesSection({ items = [] }) {
  const normalized = items.map((it) =>
    typeof it === "string"
      ? { label: it, iconPath: null }
      : it
  );

  // Creates a slug from amenity name → "Water Supply" → "water_supply"
  const toSlug = (str) =>
    str.toLowerCase().replace(/\s+/g, "_").replace(/[^\w]/g, "");

  const getIcon = (label, customIconPath) => {
    const slug = toSlug(label);
    const iconSrc = customIconPath || `/icons/${slug}.png`;

    return (
      <img
        src={iconSrc}
        alt={label}
        className="w-7 h-7 object-contain"
        onError={(e) => {
          // fallback to SVG if file not found
          e.target.onerror = null;
          e.target.replaceWith(fallbackIcon());
        }}
      />
    );
  };

  const fallbackIcon = () => (
    <div className="w-7 h-7 flex items-center justify-center">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        className="text-emerald-500"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );

  return (
    <section className="mt-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">AMENITIES</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {normalized.map((a, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="text-gray-800 font-medium">{a.label}</div>

            {/* Icon container */}
            <div className="ml-4 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                 <img
        src="/icon.svg"
        alt="icon"
        className="w-7 h-7 object-contain"
        onError={(e) => {
          // fallback to SVG if file not found
          e.target.onerror = null;
          e.target.replaceWith(fallbackIcon());
        }}
      />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
