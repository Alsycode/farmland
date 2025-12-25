import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ================= MOTION ================= */

const sectionReveal = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/* ================= COUNTER ================= */

function Counter({ value, label, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <motion.div
      variants={fadeUp}
      className="
        bg-[#f4f7ec]
        rounded-2xl
        p-8
        space-y-2
      "
    >
      <div className="text-3xl sm:text-4xl font-semibold text-[#5a6f4d]">
        {count.toLocaleString()}
      </div>
      <div className="text-sm text-[#7a8773]">
        {label}
      </div>
    </motion.div>
  );
}

/* ================= SECTION ================= */

export default function StatsCounter() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-16"
    >
      {/* Header */}
      <motion.div
        variants={stagger}
        className="text-center max-w-2xl mx-auto space-y-4"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-medium"
        >
          Our Impact So Far
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-[#5f6f5f] leading-relaxed"
        >
          A growing network of verified landowners, developers, and long-term
          investors built on trust and transparency.
        </motion.p>
      </motion.div>

      {/* Counters */}
      <motion.div
        variants={stagger}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        <Counter value={1382} label="Properties Listed" />
        <Counter value={1109} label="Developers" />
        <Counter value={1491} label="Inquiries Handled" />
        <Counter value={178} label="Sold Out Properties" />
      </motion.div>
    </motion.section>
  );
}
