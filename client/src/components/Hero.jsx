import React from 'react'
import SearchBar from './SearchBar'
import { CiSearch } from "react-icons/ci";
export default function Hero() {
  // using uploaded image path for the hero right image
  const heroImage = "/Farmland-Ownership.jpg"

  return (
    <section className="pt-12">
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-7">
          <h1 className="text-5xl lg:text-5xl font-extrabold leading-tight max-w-xl font-display">
            Find Your <span className="heading-accent">Ideal</span> Property<br/>With Us
          </h1>
          <p className="mt-6 text-gray-600 max-w-xl">
            Discover a seamless journey in finding your ideal farmland projects with our expert guidance and innovative tools
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button className="inline-flex items-center bg-[#d34d4f] gap-3 bg-accent text-white px-5 py-3 rounded-md font-semibold shadow-soft-lg">
             <CiSearch className='text-white text-2xl'/>
              Explore all Properties
            </button>

            <button className="inline-flex items-center gap-2  text-white px-4 py-3 rounded-md font-semibold bg-[#d34d4f]">
              
              Farmland Near Me
            </button>
          </div>

          {/* search card */}
          <div className="mt-10">
            <SearchBar />
          </div>
        </div>

        <div className="col-span-5">
          <div className="card-frame overflow-hidden">
            <img src={heroImage} alt="hero" className="w-full h-[360px] object-cover hero-image" />
          </div>
        </div>
      </div>
    </section>
  )
}
