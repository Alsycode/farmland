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
    <section className="w-full">
      <div
        className="
          w-full
          sm:max-w-3xl sm:mx-auto
          bg-[#eef4ee]
          rounded-none sm:rounded-3xl
          px-5 py-8
          sm:px-10 sm:py-10
          text-center
          shadow-none sm:shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
        "
      >
        {/* Quote */}
        <p
          className="
            text-base sm:text-lg md:text-xl lg:text-2xl
            italic text-green-900
            leading-relaxed
          "
        >
          “{cur.quote}”
        </p>

        {/* Author */}
        <div
          className="
            mt-5
            text-xs sm:text-sm md:text-base
            text-green-700 font-medium
          "
        >
          — {cur.author}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-7">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  i === idx
                    ? "bg-green-600 scale-125"
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
