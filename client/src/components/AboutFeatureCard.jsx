import React from "react";

export default function AboutFeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-8 text-center">
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-3 text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
