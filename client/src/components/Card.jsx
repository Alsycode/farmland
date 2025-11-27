import React from 'react'
import { FiHeart } from 'react-icons/fi'

export default function Card({ title, price, sqft, location, image }) {
  return (
    <article className="rounded-xl overflow-hidden bg-white shadow-md transition hover:shadow-lg w-full">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={image || '/public/assets/featured-1.jpg'}
          alt={title}
          className="
            w-full 
            h-36 sm:h-44 md:h-52 
            object-cover 
          "
        />

        {/* HEART ICON */}
        <button
          className="
            absolute top-3 right-3 
            bg-white/90 backdrop-blur-sm 
            p-2 sm:p-2.5 
            rounded-full shadow-sm 
            hover:bg-white transition
          "
        >
          <FiHeart size={18} className="text-gray-600" />
        </button>
      </div>

      {/* INFO */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 leading-snug">
          {title}
        </h3>

        {price && (
          <div className="mt-2 font-bold text-accent text-sm sm:text-base md:text-lg">
            {price}
          </div>
        )}

        <div className="text-xs sm:text-sm text-gray-500 mt-3">{sqft}</div>
        <div className="text-xs sm:text-sm text-gray-500">{location}</div>
      </div>

    </article>
  )
}
