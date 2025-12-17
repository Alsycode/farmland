import React from "react";

export default function AmenitiesSection({ items = [] }) {
  const normalized = items.map((it) =>
    typeof it === "string" ? { label: it, iconPath: null } : it
  );

  const fallbackIcon = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-green-600"
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
  );

  return (
    <section
      className="
        bg-[#eef4ee] rounded-3xl p-6
        shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
      "
    >
      <h2 className="text-xl font-semibold text-green-900 mb-6">
        Amenities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {normalized.map((a, i) => (
          <div
            key={i}
            className="
              flex items-center justify-between p-4 rounded-2xl
              bg-[#eef4ee]
              shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
            "
          >
            <div className="text-green-900 font-medium">
              {a.label}
            </div>

            {/* Icon well */}
            <div
              className="
                w-11 h-11 rounded-full flex items-center justify-center
                bg-[#eef4ee]
                shadow-[inset_4px_4px_8px_#cfd8cf,inset_-4px_-4px_8px_#ffffff]
              "
            >
              <img
                src="/icon.svg"
                alt={a.label}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.replaceWith(fallbackIcon());
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
