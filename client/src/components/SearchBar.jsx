import React from "react";

export default function SearchBar() {
  return (
    <div className="bg-white card-frame px-4 sm:px-5 py-4 rounded-xl shadow-soft-lg w-full">
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-12 
        gap-4 
        items-start
      ">
        
        {/* STATE */}
        <div className="md:col-span-4">
          <label className="text-xs text-gray-500">State</label>
          <div className="mt-2 text-sm text-gray-400">Select state</div>
        </div>

        {/* CITY */}
        <div className="md:col-span-4 md:border-l md:pl-6">
          <label className="text-xs text-gray-500">City</label>
          <div className="mt-2 text-sm text-gray-400">Select state first</div>
        </div>

        {/* PRICE RANGE */}
        <div className="md:col-span-3 md:border-l md:pl-6">
          <label className="text-xs text-gray-500">Price Range</label>
          <div className="mt-2 text-sm text-gray-400">Select price range</div>
        </div>

        {/* BUTTONS */}
        <div className="
          md:col-span-1 
          flex 
          sm:flex-row 
          flex-col 
          gap-3 
          justify-end 
          w-full
        ">
          <button className="
            w-full sm:w-auto 
            px-4 py-2 
            bg-accent 
            text-white 
            rounded-md 
            font-semibold
          ">
            Find
          </button>

          <button className="
            w-full sm:w-auto
            px-4 py-2 
            border 
            rounded-md 
            text-gray-600
          ">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
