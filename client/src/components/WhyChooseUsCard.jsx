import React from "react";
import { FaCheckSquare } from "react-icons/fa";

export default function WhyChooseUsCard() {
  return (
    <div className="bg-[#f2f3f5] rounded-xl p-10 shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        ✨ Why Choose Us?
      </h2>

      <div className="mt-6 space-y-4 text-gray-700">
        <div className="flex items-start gap-3">
          <FaCheckSquare className="text-green-500 mt-1" />
          <p>Extensive listings of premium farmland and farmhouses</p>
        </div>

        <div className="flex items-start gap-3">
          <FaCheckSquare className="text-green-500 mt-1" />
          <p>Hassle-free buying process with expert support</p>
        </div>

        <div className="flex items-start gap-3">
          <FaCheckSquare className="text-green-500 mt-1" />
          <p>Tailored solutions to match your investment goals</p>
        </div>

        <div className="flex items-start gap-3">
          <FaCheckSquare className="text-green-500 mt-1" />
          <p>Transparent transactions with complete legal assistance</p>
        </div>

        <p className="mt-6 text-gray-700">
          Whether you're a first-time buyer, a seasoned investor, or someone looking for a
          peaceful retreat, we help turn your farmland and farmhouse dreams into reality.
        </p>
      </div>
    </div>
  );
}
