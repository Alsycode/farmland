// path: src/components/TestimonialCarousel.jsx
import React, { useState, useEffect } from "react";

const sample = [
  {
    id: 1,
    quote: "Found the perfect plot for my orchard. Smooth process!",
    author: "Ramesh K."
  },
  {
    id: 2,
    quote: "Great selection and honest owners. Visited 3 farms easily.",
    author: "Anita P."
  },
  {
    id: 3,
    quote: "Excellent support from the site to schedule visits.",
    author: "Vikram S."
  }
];

export default function TestimonialCarousel({
  items = sample,
  interval = 4000
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx(i => (i + 1) % items.length),
      interval
    );
    return () => clearInterval(t);
  }, [items.length, interval]);

  const cur = items[idx];

  return (
    <section className="w-full flex justify-center">
      <div
        className="
          w-full max-w-3xl
          bg-[#eef4ee]
          rounded-3xl
          px-6 py-10 sm:px-10
          shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
          text-center
        "
      >
        {/* Quote */}
        <p
          className="
            text-lg sm:text-xl md:text-2xl
            italic text-green-900
            leading-relaxed
          "
        >
          “{cur.quote}”
        </p>

        {/* Author */}
        <div className="mt-6 text-sm sm:text-base text-green-700 font-medium">
          — {cur.author}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`
                w-3 h-3 rounded-full transition-all
                ${
                  i === idx
                    ? "bg-green-600 scale-125 shadow-[2px_2px_4px_#9fbfa2,-2px_-2px_4px_#ffffff]"
                    : "bg-green-300"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
