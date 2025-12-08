import React from "react";

export default function InvestmentSection({ data = {} }) {
  // Simple investment details; map your fields or use fallbacks
  const oneAcre = data.oneAcrePrice || "₹34 Lakhs";
  const fiveAcre = data.fiveAcrePrice || "₹1.7 Crore";
  const returnsNote = data.returnsNote || "A single acre of Red Sandalwood planted land is projected to yield returns of up to ₹12 Crores after 10 years.";

  return (
    <section className="mt-8 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Investment Details & Returns</h2>
      <div className="text-gray-700 mb-4">
        <p>We offer a straightforward investment model with high projected returns.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <div className="text-sm text-gray-500">Product</div>
          <div className="font-medium">One Acre</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{oneAcre}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Product</div>
          <div className="font-medium">Five Acres</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{fiveAcre}</div>
        </div>
        <div className="col-span-full sm:col-span-1">
          <h4 className="font-semibold">Return & Resale Projections</h4>
          <p className="text-gray-700 text-sm mt-2">{returnsNote}</p>
        </div>
      </div>
    </section>
  );
}
