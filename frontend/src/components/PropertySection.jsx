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
  hidden: { y: 28, opacity: 0 },
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
    <section>

      {/* ================= HEADER ================= */}
      <motion.div
        className="flex justify-between items-center mb-8"
        variants={headerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-bold"
        >
          {title}
        </motion.h2>

        <motion.div variants={fadeUp}>
          <Link to={link} className="text-green-700 font-medium">
            View all →
          </Link>
        </motion.div>
      </motion.div>

      {/* ================= CONTENT WRAPPER (STATIC) ================= */}
      <div
        className="
          rounded-3xl p-6
          shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
        "
      >
        {loading ? (
          <div className="py-10 text-green-700">Loading…</div>
        ) : error ? (
          <div className="py-10 text-red-600">{error}</div>
        ) : items.length === 0 ? (
          <div className="py-10 text-green-700">
            No properties available
          </div>
        ) : (
          /* ================= GRID ================= */
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
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
