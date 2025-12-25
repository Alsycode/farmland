import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import PropertySection from "../components/PropertySection";
import StatsCounter from "../components/StatsCounter";
import propertyService from "../services/propertyService";

/* ================= MOTION ================= */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertyService
      .list({ featured: true, limit: 3 })
      .then(res => setFeatured(res?.items || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#F5F4F1] text-[#161616]">
      <main className="max-w-7xl mx-auto px-6 space-y-40">

        {/* HERO */}
        <section className="pt-24 grid md:grid-cols-12 gap-16 items-center">
          <motion.div
            className="md:col-span-7"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-semibold leading-[1.1]"
            >
              A refined way to<br />
              invest in <span className="italic text-[#2F5D50]">farmland</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-lg leading-relaxed text-[#6B6B6B]"
            >
              Verified agricultural properties curated for long-term value,
              clarity, and trust.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <Link
                to="/search"
                className="
                  inline-block px-8 py-4
                  bg-[#2F5D50] text-white
                  rounded-lg font-medium
                  hover:bg-[#264D43] transition
                "
              >
                Browse Properties
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:col-span-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <img
              src="/Farmland-Ownership.jpg"
              className="rounded-3xl w-full h-[420px] object-cover"
              alt="Farmland"
            />
          </motion.div>
        </section>

        {/* FEATURED */}
        <PropertySection
          title="Featured Properties"
          items={featured}
          loading={loading}
        />

        <StatsCounter />
      </main>
    </div>
  );
}
