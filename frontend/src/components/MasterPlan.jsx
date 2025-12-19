import React, { useEffect, useState } from "react";

export default function MasterPlan({ src, alt = "Master plan" }) {
  const imgSrc = src || "/masterPlan.png";
  const [open, setOpen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      {/* ===== MASTER PLAN CARD ===== */}
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
            relative rounded-2xl p-3 bg-[#eef4ee]
            shadow-[inset_6px_6px_12px_#cfd8cf,inset_-6px_-6px_12px_#ffffff]
            flex justify-center cursor-zoom-in group
          "
          onClick={() => setOpen(true)}
        >
          <img
            src={imgSrc}
            alt={alt}
            className="
              max-w-full h-auto rounded-xl
              transition-transform duration-300
              group-hover:scale-[1.02]
            "
            loading="lazy"
          />

          {/* Hover hint */}
          <div
            className="
              absolute inset-0 flex items-center justify-center
              bg-black/0 group-hover:bg-black/30
              transition
            "
          >
            <span
              className="
                opacity-0 group-hover:opacity-100
                text-white text-sm px-4 py-2 rounded-full
                bg-black/60
              "
            >
              Click to view full screen
            </span>
          </div>
        </div>
      </section>

      {/* ===== FULLSCREEN MODAL ===== */}
      {open && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/80
            flex items-center justify-center
            p-4
          "
          onClick={() => setOpen(false)}
        >
          <div
            className="
              relative w-full max-w-6xl max-h-full
              bg-[#eef4ee] rounded-3xl p-4
              shadow-[10px_10px_20px_#00000055]
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="
                absolute top-3 right-3
                w-10 h-10 rounded-full
                bg-[#eef4ee] text-green-800 font-bold
                shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
              "
              aria-label="Close"
            >
              ✕
            </button>

            <img
              src={imgSrc}
              alt={`${alt} fullscreen`}
              className="
                w-full h-[80vh]
                object-contain
                rounded-2xl
              "
            />
          </div>
        </div>
      )}
    </>
  );
}
