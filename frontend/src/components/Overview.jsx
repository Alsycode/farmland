import React from "react";

function Item({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-emerald-50 text-emerald-600 shrink-0">
        {/* icon may be an svg element or text */}
        {icon || (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )}
      </div>
      <div>
        <div className="text-xs text-gray-500 font-semibold">{label}</div>
        <div className="text-gray-800 font-medium">{value}</div>
      </div>
    </div>
  );
}

export default function OverviewGrid({ data = {} }) {
  // Expects keys: propertyType, projectArea, boundaryWall, priceNegotiable, availability, managedFarms, openSides, maintenanceYears, transactionType
  // TODO(replace): map to your real property fields if different
  const items = [
    { label: "PROPERTY TYPE", value: data.propertyType || "Farmland" },
    { label: "PROJECT AREA", value: data.projectArea || "—" },
    { label: "BOUNDARY WALL", value: data.boundaryWall ? "Yes" : "No" },
    { label: "PRICE NEGOTIABLE", value: data.priceNegotiable ? "Yes" : "No" },
    { label: "AVAILABILITY STATUS", value: data.availability || "Available" },
    { label: "MANAGED FARMS", value: data.managedFarms ? "Yes" : "No" },
    { label: "OPEN SIDES COUNT", value: data.openSides || "—" },
    { label: "FREE YEARS OF MAINTENANCE", value: data.maintenanceYears || "—" },
    { label: "TRANSACTION TYPE", value: data.transactionType || "New" },
  ];

  return (
    <section className="mt-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">OVERVIEW</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it) => (
          <Item key={it.label} icon={null} label={it.label} value={it.value} />
        ))}
      </div>
    </section>
  );
}
