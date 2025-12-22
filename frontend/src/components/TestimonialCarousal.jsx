// path: src/components/TestimonialCarousel.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= MOTION TOKENS ================= */

// Scroll reveal for section (used once)
const sectionReveal = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Content swap animation (very restrained)
const quoteSwap = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

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
    <motion.section
      className="w-screen sm:w-full overflow-hidden"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div
        className="
          w-screen sm:max-w-3xl
          mx-0 sm:mx-auto
          bg-[#eef4ee]
          px-6 py-10
          sm:px-10 sm:py-12
          text-center
          rounded-none sm:rounded-3xl
          shadow-none sm:shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
        "
      >
        {/* ================= QUOTE ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            {...quoteSwap}
          >
            <p
              className="
                text-base sm:text-lg md:text-xl lg:text-2xl
                italic text-green-900
                leading-relaxed
              "
            >
              “{cur.quote}”
            </p>

            <div
              className="
                mt-6
                text-sm sm:text-base
                text-green-700 font-medium
              "
            >
              — {cur.author}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ================= DOTS ================= */}
        <div className="flex justify-center gap-3 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${i === idx ? "bg-green-600 scale-125" : "bg-green-300"}
              `}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
