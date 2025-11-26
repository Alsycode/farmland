import React from 'react'
import { FiSearch, FiUser } from 'react-icons/fi'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="w-full mx-auto px-2 lg:px-12">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                {/* Logo mark */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-brandGreen">
                  <circle cx="12" cy="12" r="10" fill="#e9f5ef"/>
                  <path d="M12 6v8" stroke="#153f35" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M9 12c0 1.7 1.2 3 3 3s3-1.3 3-3" stroke="#153f35" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold text-lg text-brandGreen">MYFARMLAND.CO</div>
                <div className="text-xs text-gray-500 -mt-0.5">Connecting Generations</div>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <a className="text-gray-800 border-b-2 border-transparent hover:border-accent hover:text-gray-900 py-3" href="#">Home</a>
            <a className="hover:text-gray-800" href="#">Blog</a>
            <a className="hover:text-gray-800" href="#">About</a>
            <a className="hover:text-gray-800" href="#">Contact</a>
            <a className="hover:text-gray-800" href="#">Post Your Property</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 border rounded-full px-3 py-2 text-sm text-gray-700">
              <FiUser />
              Login
            </button>
            <button className="hidden md:inline-flex items-center gap-2 bg-accent text-white font-semibold px-2 py-2 rounded-[10px] bg-gradient-to-r from-[#cd4a6c] to-[#92332e] ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M12 3v18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Explore FarmStay
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
