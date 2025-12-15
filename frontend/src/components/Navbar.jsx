import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbar
 * - Visual alignment with Homepage B
 * - Links, routing, logic preserved
 */

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
              <span className="font-bold text-primary-600">F</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-lg leading-none">
                MyFarmland
              </div>
              <div className="text-xs text-gray-500 -mt-0.5">
                Verified land listings
              </div>
            </div>
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <Link to="/" className="hover:text-primary-600">
              Home
            </Link>
            <Link to="/search" className="hover:text-primary-600">
              Search
            </Link>
            <Link to="/blogs" className="hover:text-primary-600">
              Blogs
            </Link>
            <Link to="/contact" className="hover:text-primary-600">
              Contact
            </Link>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium hover:bg-gray-50"
            >
              Login
            </Link>

            <Link
              to="/search"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#cd4a6c] to-[#92332e] text-white text-sm font-semibold shadow-sm hover:scale-[0.98] transition"
            >
              Explore
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
