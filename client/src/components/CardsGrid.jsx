import React from "react";
import Card from "./Card";

const items = [
  {
    title: "Shivalik Hill by Aranyakaa Farms",
    price: "₹35.0 L Onwards",
    sqft: "10000 sq.ft",
    location: "Denkanikota",
    image: "/Farmland-Ownership.jpg",
  },
  {
    title: "Vanodhara Farms by Aranyakaa F...",
    price: "₹50.0 L Onwards",
    sqft: "10000 sq.ft",
    location: "Ramanagara",
    image: "/british-farmland(4).jpg",
  },
  {
    title: "Interior Design Listing",
    price: "—",
    sqft: "—",
    location: "",
    image: "/image9-6539d80b25aaf-1024x521.webp",
    tall: true,
  },
  {
    title: "Gate Entrance Property",
    price: "₹12.5 L Onwards",
    sqft: "5000 sq.ft",
    location: "Anantapur",
    image: "/HarvestcMatthewRoberts.jpg.webp",
  },
];

export default function CardsGrid() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* left: featured list (full width on mobile, 8/12 on md+) */}
        <div className="md:col-span-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-brandGreen">
              Featured
            </h2>
            <div className="ml-auto">
              <button className="bg-accent text-white px-4 py-2 rounded-md text-sm sm:text-base">
                View more
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
          <div className="card-frame overflow-hidden rounded-xl relative">
            <img
              src="/Agriculture-Land-Farmland-Market-Page.jpg"
              alt="promo tall"
              loading="lazy"
              className="w-full h-48 sm:h-64 md:h-[640px] object-cover"
            />
            {/* optional overlay content */}
            <div className="absolute inset-0 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
