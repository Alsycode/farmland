import React from 'react'
import Card from './Card'

const trending = new Array(4).fill(0).map((_, i) => ({
  title: ["Forest Breeze ...", "Forest Breeze ...", "Kodikonda Hill...", "Arogya Vana"][i],
  price: "₹50.0 L Onwards",
  sqft: "10000 sq.ft",
  location: ["Denkanikota","Hosur","Anantapur","Anantapur"][i],
  image: "/Gallery10.webp"
}))

export default function Trending() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-brandGreen mb-6">Trending</h2>

      <div className="grid grid-cols-4 gap-6">
        {trending.map((t, i) => (
          <Card key={i} {...t} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="card-frame rounded-xl overflow-hidden">
            <img src="/3a86f2e0-5ed6-4de9-a83b-0c43ef2e376b.webp" alt="ad" className="w-full h-56 object-cover" />
          </div>
        </div>
        <div className="col-span-4">
          <div className="card-frame rounded-xl p-4 flex items-center justify-center h-56">
            <div className="text-center">
              <h4 className="font-semibold">Ad / Promo</h4>
              <p className="text-sm text-gray-500 mt-2">Most affordable premium villa at Sarjapura</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
