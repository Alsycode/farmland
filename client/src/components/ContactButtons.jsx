import React from "react";
import { FiPhone } from "react-icons/fi";

export default function ContactButtons() {
  return (
    <div className="flex gap-4 mt-6">
      <button className="flex items-center gap-2 px-5 py-3 border border-red-200 text-red-600 rounded-md">
        <FiPhone /> Contact
      </button>
      <button className="px-5 py-3 border border-green-700 text-green-700 rounded-md">Brochure</button>
      <button className="px-5 py-3 border border-blue-200 text-blue-600 rounded-md">Compare</button>
    </div>
  );
}
