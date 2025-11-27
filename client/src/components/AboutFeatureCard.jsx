import React from "react";

export default function AboutFeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 sm:p-7 md:p-8 text-center w-full">
      {/* Icon */}
      <div className="flex justify-center">
        {/* Scale icon automatically if it's a React icon */}
        <div className="text-3xl sm:text-4xl md:text-5xl text-brandGreen">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
        {title}
      </h3>

      {/* Text */}
      <p className="mt-3 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
        {text}
      </p>
    </div>
  );
}
