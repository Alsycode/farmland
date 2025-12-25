import React from "react";
import PropertyEditorialCard from "./PropertyEditorialCard";

export default function PropertyShowcase({ items }) {
  return (
    <section className="space-y-32">
      <header className="max-w-2xl">
        <h2 className="text-5xl font-semibold leading-tight">
          Featured Land Assets
        </h2>
        <p className="mt-6 text-lg text-[#555555]">
          Selected opportunities that meet our highest standards of
          location, scale, and long-term appreciation.
        </p>
      </header>

      <div className="space-y-24">
        {items.map((p, i) => (
          <PropertyEditorialCard
            key={p._id}
            property={p}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
