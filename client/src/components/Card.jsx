import React from 'react'
import { FiHeart } from 'react-icons/fi'

export default function Card({ title, price, sqft, location, image, tall }) {
  return (
    <article className="card-frame rounded-xl overflow-hidden relative">
      <div className="relative">
        <img src={image || '/public/assets/featured-1.jpg'} alt={title} className="w-full h-44 object-cover img-rounded" />
        <div className="absolute top-3 right-3 heart-bubble">
          <FiHeart size={16} className="text-gray-600" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        {price && <div className="mt-2 font-bold text-accent">{price}</div>}
        <div className="text-sm text-gray-400 mt-3">{sqft}</div>
        <div className="text-sm text-gray-400">{location}</div>
      </div>
    </article>
  )
}
