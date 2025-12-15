import React from "react";

export default function MasterPlan({ src, alt = "Master plan" }) {
  // src should be a public URL or path (e.g. property.masterPlanImage)
  // TODO(replace): requires property.masterPlanImage to be provided
  const imgSrc = src || "/masterPlan.png";

  return (
    <section className="mt-12 bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">MASTER PLAN</h2>
      <div className="w-full flex justify-center">
        <img
          src={imgSrc}
          alt={alt}
          className="max-w-full h-auto rounded-md border"
          loading="lazy"
        />
      </div>
    </section>
  );
}
