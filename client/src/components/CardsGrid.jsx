import React from 'react'
import Card from './Card'

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
]

export default function CardsGrid() {
  return (
    <div className="grid grid-cols-12 gap-8 items-start">
      {/* left 8 columns as list */}
      <div className="col-span-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-brandGreen">Featured</h2>
          <button className="bg-accent text-white px-4 py-2 rounded-md">View more</button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {items.map((it, idx) => (
            <Card key={idx} {...it} />
          ))}
        </div>
      </div>

      {/* right tall promo (like the vertical interior image) */}
      <div className="col-span-4">
        <div className="card-frame overflow-hidden rounded-xl">
          <img
            src="/Agriculture-Land-Farmland-Market-Page.jpg"
            alt="promo tall"
            className="w-full h-[640px] object-cover"
          />
          <div className="absolute"></div>
        </div>
      </div>
    </div>
  )
}
