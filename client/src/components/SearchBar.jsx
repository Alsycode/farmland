import React from 'react'

export default function SearchBar() {
  return (
    <div className="bg-white card-frame px-5 py-4 rounded-xl shadow-soft-lg max-w-4xl">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4">
          <label className="text-xs text-gray-500">State</label>
          <div className="mt-2 text-sm text-gray-400">Select state</div>
        </div>
        <div className="col-span-4 border-l pl-6">
          <label className="text-xs text-gray-500">City</label>
          <div className="mt-2 text-sm text-gray-400">Select state first</div>
        </div>
        <div className="col-span-3 border-l pl-6">
          <label className="text-xs text-gray-500">Price Range</label>
          <div className="mt-2 text-sm text-gray-400">Select price range</div>
        </div>
        <div className="col-span-1 flex items-center gap-3 justify-end">
          <button className="px-4 py-2 bg-accent text-white rounded-md font-semibold">Find</button>
          <button className="px-4 py-2 border rounded-md text-gray-600">Clear</button>
        </div>
      </div>
    </div>
  )
}
