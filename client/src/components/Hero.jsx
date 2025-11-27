import React from "react";
import SearchBar from "./SearchBar";
import { CiSearch } from "react-icons/ci";

export default function Hero() {
  const heroImage = "/Farmland-Ownership.jpg";

  return (
    <section className="pt-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left / Text */}
          <div className="md:col-span-7">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-xl font-display">
              Find Your <span className="heading-accent">Ideal</span> Property
              <br />
              With Us
            </h1>

            <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base max-w-xl">
              Discover a seamless journey in finding your ideal farmland projects
              with our expert guidance and innovative tools.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button className="w-full sm:w-auto inline-flex items-center gap-3 bg-[#d34d4f] text-white px-5 py-3 rounded-md font-semibold shadow-soft-lg justify-center">
                <CiSearch className="text-white text-2xl" />
                Explore all Properties
              </button>

              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white px-4 py-3 rounded-md font-semibold bg-[#d34d4f]">
                Farmland Near Me
              </button>
            </div>

            {/* search card */}
           
          </div>

          {/* Right / Image */}
          <div className="md:col-span-5">
            <div className="card-frame overflow-hidden rounded-lg shadow-sm">
              <img
                src={heroImage}
                alt="Farmland"
                loading="lazy"
                className="w-full h-56 sm:h-64 md:h-[360px] object-cover hero-image"
              />
            </div>
          </div>
        </div>
         <div className="mt-6 sm:mt-8">
              <div className="w-full ">
                <SearchBar />
              </div>
            </div>
      </div>
    </section>
  );
}
