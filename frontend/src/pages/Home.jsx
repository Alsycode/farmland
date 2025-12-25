// path: src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import PropertySection from "../components/PropertySection";
import TestimonialCarousel from "../components/tesimonialCarousal";
import HomeBlogSlider from "../components/HomeBlogSlider";
import StatsCounter from "../components/StatsCounter";
import propertyService from "../services/propertyService";

/* ================= MOTION ================= */

const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUp = {
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

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadAll() {
      try {
        const [featuredRes, trendingRes, upcomingRes] = await Promise.all([
          propertyService.list({ featured: true, limit: 3 }),
          propertyService.list({ trending: true, limit: 3 }),
          propertyService.list({ upcoming: true, limit: 3 })
        ]);

        if (!mounted) return;

        setFeatured(featuredRes?.items || featuredRes?.data || []);
        setTrending(trendingRes?.items || trendingRes?.data || []);
        setUpcoming(upcomingRes?.items || upcomingRes?.data || []);
      } catch {
        if (mounted) setError("Failed to load properties");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAll();
    return () => (mounted = false);
  }, []);

  return (
    <div className="bg-[#eef2df] text-[#2f3a2f] min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-24 space-y-32">

        {/* ================= HERO ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            className="lg:col-span-6 space-y-8"
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm tracking-wide text-[#6b7a5e]"
            >
              Discover Land
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
            >
              Find farmland
              <br />
              <span className="text-[#5a6f4d]">
                for your future
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base text-[#5f6f5f] leading-relaxed max-w-lg"
            >
              Verified farmland listings with direct owners, transparent
              processes, and long-term value in mind.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex gap-6 pt-6"
            >
              <Link
                to="/search"
                className="
                  px-7 py-3 rounded-xl
                  bg-[#5a6f4d]
                  text-white
                  font-medium
                  hover:bg-[#4f6443]
                  transition
                "
              >
                Browse Properties
              </Link>

              <Link
                to="/explore"
                className="
                  px-7 py-3 rounded-xl
                  border border-[#c8d2be]
                  text-[#2f3a2f]
                  font-medium
                  hover:bg-[#f4f7ec]
                  transition
                "
              >
                Explore Map
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual block (same as About) */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden bg-[#dfe6d2] aspect-[4/3]" />
          </div>
        </section>

        {/* ================= PROPERTY SECTIONS ================= */}
        <PropertySection
          title="Featured Properties"
          link="/search?featured=true"
          items={featured}
          loading={loading}
          error={error}
        />

        <PropertySection
          title="Trending Properties"
          link="/search?trending=true"
          items={trending}
          loading={loading}
          error={error}
        />

        <PropertySection
          title="Upcoming Properties"
          link="/search?upcoming=true"
          items={upcoming}
          loading={loading}
          error={error}
        />

        {/* ================= CONTENT SECTIONS ================= */}
        <HomeBlogSlider />

        <TestimonialCarousel />

        <StatsCounter />

      </main>
    </div>
  );
}
