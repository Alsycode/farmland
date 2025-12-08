import React from "react";
import Card from "./Card";
import en from "../locals/en.json";

/**
 * CardsGrid - polished layout for featured items and promo
 * - Preserves original items data, only adjusts presentation
 */

const items = [
  {
    title: "Shivalik Hill by Aranyakaa Farms",
    price: "₹35.0 L Onwards",
    sqft: "10000 sq.ft",
    location: "Denkanikota",
    image: "/Farmland-Ownership.jpg"
  },
  {
    title: "Vanodhara Farms by Aranyakaa F...",
    price: "₹50.0 L Onwards",
    sqft: "10000 sq.ft",
    location: "Ramanagara",
    image: "/british-farmland(4).jpg"
  },
  {
    title: "Interior Design Listing",
    price: "—",
    sqft: "—",
    location: "",
    image: "/image9-6539d80b25aaf-1024x521.webp",
    tall: true
  },
  {
    title: "Gate Entrance Property",
    price: "₹12.5 L Onwards",
    sqft: "5000 sq.ft",
    location: "Anantapur",
    image: "/HarvestcMatthewRoberts.jpg.webp"
  }
];

export default function CardsGrid() {
  const t = en.featured;

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* left: featured list (full width on mobile, 8/12 on md+) */}
        <div className="md:col-span-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {t.heading}
            </h2>

            <div className="ml-auto">
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-300"
                aria-label={t.viewMore}
              >
                {t.viewMore}
              </button>
            </div>
          </div>

          {/* cards grid: single column on very small, 2 columns on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((it, idx) => (
              <div
                key={idx}
                className={`w-full ${it.tall ? "md:row-span-2" : ""}`}
              >
                <Card {...it} />
              </div>
            ))}
          </div>
        </div>

        {/* right: tall promo (full width on mobile, 4/12 on md+) */}
        <div className="md:col-span-4">
          <div className="overflow-hidden rounded-2xl relative shadow-sm">
            <img
              src="/Agriculture-Land-Farmland-Market-Page.jpg"
              alt="Promotional farmland image"
              loading="lazy"
              className="w-full h-48 sm:h-64 md:h-[640px] object-cover"
            />
            <div className="absolute inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
