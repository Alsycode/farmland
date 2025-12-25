// path: src/components/PropertySection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";

/* ================= MOTION TOKENS ================= */

const headerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const gridStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

export default function PropertySection({ title, link, items, loading, error }) {
  return (
    <section className="space-y-8">

      {/* ================= HEADER ================= */}
      <motion.div
        className="flex justify-between items-center"
        variants={headerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-medium"
        >
          {title}
        </motion.h2>

        <motion.div variants={fadeUp}>
          <Link
            to={link}
            className="
              text-sm
              font-medium
              text-[#6b7a5e]
              hover:text-[#5a6f4d]
              transition
            "
          >
            View all →
          </Link>
        </motion.div>
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div
        className="
          rounded-3xl
          p-8
          bg-[#f4f7ec]
        "
      >
        {loading ? (
          <div className="py-12 text-[#6b7a5e]">
            Loading…
          </div>
        ) : error ? (
          <div className="py-12 text-red-600">
            {error}
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-[#6b7a5e]">
            No properties available
          </div>
        ) : (
          /* ================= GRID ================= */
          <motion.div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              gap-6
            "
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {items.map(p => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
