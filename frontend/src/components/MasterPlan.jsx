import React from "react";

export default function MasterPlan({ src, alt = "Master plan" }) {
  const imgSrc = src || "/masterPlan.png";

  return (
    <section
      className="
        bg-[#eef4ee] rounded-3xl p-6
        shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
      "
    >
      <h2 className="text-xl font-semibold text-green-900 mb-4">
        Master Plan
      </h2>

      <div
        className="
          rounded-2xl p-3 bg-[#eef4ee]
          shadow-[inset_6px_6px_12px_#cfd8cf,inset_-6px_-6px_12px_#ffffff]
          flex justify-center
        "
      >
        <img
          src={imgSrc}
          alt={alt}
          className="max-w-full h-auto rounded-xl"
          loading="lazy"
        />
      </div>
    </section>
  );
}
