import React from "react";

export default function AmenitiesGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
      {items.map((a, i) => (
        <div key={i} className="bg-gray-100 text-sm text-gray-700 py-3 px-4 rounded-md text-center">
          {a}
        </div>
      ))}
    </div>
  );
}
