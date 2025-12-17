import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../components/tesimonialCarousal';
import PropertyCard from '../components/PropertyCard';
import propertyService from '../services/propertyService';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadFeatured() {
      try {
        const res = await propertyService.list({ featured: true, limit: 6 });
        const items = res?.items || res?.data || res?.properties || [];
        if (mounted) setFeatured(items);
      } catch (err) {
        if (mounted) setError('Failed to load featured properties');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadFeatured();
    return () => (mounted = false);
  }, []);

  return (
    <div className="bg-[#eef4ee] min-h-screen text-green-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-24">

        {/* HERO */}
        <section className="pt-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-xl">
              Find the perfect <span className="text-green-700">farmland</span>
              <br /> for your future
            </h1>

            <p className="mt-6 text-green-700 max-w-xl text-lg">
              Verified farmland listings, direct owners, and transparent property discovery.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/search"
                className="
                  px-6 py-3 rounded-xl text-white font-semibold
                  bg-green-600
                  shadow-[3px_3px_6px_#9fbfa2,-3px_-3px_6px_#dff1e2]
                  hover:bg-green-700
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
            </div>
          </div>

          <div className="md:col-span-5">
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
          </div>
        </section>

        {/* FEATURED */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <Link to="/search" className="text-green-700 font-medium">
              View all
            </Link>
          </div>

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
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featured.map(p => (
                  <PropertyCard key={p._id} property={p} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TESTIMONIALS */}
        {/* <TestimonialCarousel /> */}

      </main>
    </div>
  );
}
