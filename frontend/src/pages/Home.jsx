// path: src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import PropertySection from "../components/PropertySection";
import TestimonialCarousel from "../components/tesimonialCarousal";
import HomeBlogSlider from "../components/HomeBlogSlider";
import StatsCounter from "../components/StatsCounter";
import propertyService from "../services/propertyService";

/* ================= MOTION TOKENS ================= */

// Editorial, restrained reveal
const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUp = {
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
    <div className="bg-[#eef4ee] min-h-screen text-green-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-28">

        {/* ================= HERO ================= */}
        <section className="pt-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">

          {/* Text column — staggered, editorial reveal */}
          <motion.div
            className="md:col-span-7"
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-xl"
            >
              Find the perfect{" "}
              <span className="text-green-700">farmland</span>
              <br /> for your future
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-green-700 max-w-xl text-lg"
            >
              Verified farmland listings, direct owners, and transparent
              property discovery.
            </motion.p>

            {/* CTAs animate last — never lead */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="/search"
                className="
                  px-6 py-3 rounded-xl text-white font-semibold
                  bg-green-600
                  shadow-[3px_3px_6px_#9fbfa2,-3px_-3px_6px_#dff1e2]
                  hover:bg-green-700
                  transition-colors
                "
              >
                Search Properties
              </Link>

              <Link
                to="/explore"
                className="
                  px-6 py-3 rounded-xl font-semibold
                  bg-[#eef4ee] text-green-800
                  shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
                "
              >
                Explore on Map
              </Link>
            </motion.div>
          </motion.div>

          {/* Image — single calm reveal, no stagger */}
          <motion.div
            className="md:col-span-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div
              className="
                rounded-3xl overflow-hidden
                shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
              "
            >
              <img
                src="/Farmland-Ownership.jpg"
                alt="Farmland"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </motion.div>
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

        {/* ================= BLOG ================= */}
        <HomeBlogSlider />

        {/* ================= TESTIMONIALS ================= */}
        <TestimonialCarousel />

        {/* ================= STATS ================= */}
        <StatsCounter />

      </main>
    </div>
  );
}
