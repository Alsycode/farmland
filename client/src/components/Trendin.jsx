import React from "react";
import Card from "./Card";
import en from "../locals/en.json";

/**
 * Trendin.jsx
 * - Kept filename to match project's existing import path.
 * - Responsive grid, accessible headings, promo area with alt text.
 */

const trending = new Array(4).fill(0).map((_, i) => ({
  title: ["Forest Breeze ...", "Forest Breeze ...", "Kodikonda Hill...", "Arogya Vana"][i],
  price: "₹50.0 L Onwards",
  sqft: "10000 sq.ft",
  location: ["Denkanikota", "Hosur", "Anantapur", "Anantapur"][i],
  image: "/Gallery10.webp"
}));

export default function Trending() {
  const t = en.trending;

  return (
    <section aria-labelledby="trending-heading" className="px-4 sm:px-6 lg:px-12 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 id="trending-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          {t.heading}
        </h2>

        {/* responsive cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trending.map((tItem, i) => (
            <div key={i} className="w-full">
              <Card {...tItem} />
            </div>
          ))}
        </div>

        {/* promo / ad section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl shadow-sm bg-white dark:bg-slate-800">
              <img
                src="/3a86f2e0-5ed6-4de9-a83b-0c43ef2e376b.webp"
                alt="Promotional aerial view of premium property"
                className="w-full h-48 sm:h-56 md:h-72 lg:h-[360px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/80 p-6 flex items-center justify-center h-48 sm:h-56 md:h-72 lg:h-[360px] shadow-sm">
              <div className="text-center">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{t.promoTitle}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{t.promoSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
