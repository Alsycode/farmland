import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../components/tesimonialCarousal';
import PropertyCard from '../components/PropertyCard';
import BlogSlider from '../components/BlogSliderPlaceholder';
import propertyService from '../services/propertyService';

/**
 * Home page (VISUAL TRANSFORMATION ONLY)
 * - Functionality, APIs, state, routing preserved
 * - Styling & layout aligned to Homepage B
 */

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadFeatured() {
      setLoading(true);
      setError(null);
      try {
        const res = await propertyService.list({ featured: true, limit: 6 });
        const items =
          res?.items ||
          res?.data ||
          res?.properties ||
          (Array.isArray(res) ? res : []);
        if (mounted) setFeatured(items);
      } catch (err) {
        if (mounted) {
          setError(
            err?.response?.data?.error ||
              err?.message ||
              'Failed to load featured properties'
          );
          setFeatured([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadFeatured();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-neutral-50 min-h-screen text-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-20">

        {/* ================= HERO SECTION ================= */}
        <section className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* LEFT */}
          <div className="md:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-xl">
              Find the perfect{' '}
              <span className="text-primary-600">farmland</span>
              <br />
              for your future
            </h1>

            <p className="mt-6 text-slate-600 max-w-xl text-base sm:text-lg">
              Explore verified farmland listings, shortlist properties,
              schedule visits, and connect directly with land owners.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/search"
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition"
              >
                Search Properties
              </Link>

              <Link
                to="/explore"
                className="inline-flex items-center justify-center border border-primary-200 bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
              >
                Explore on Map
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-2xl shadow-sm bg-white">
              <img
                src="/Farmland-Ownership.jpg"
                alt="Farmland aerial view"
                className="w-full h-64 sm:h-72 md:h-[380px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ================= QUICK SEARCH CARD ================= */}
        <section>
          <div className="bg-white rounded-xl shadow-soft-lg px-6 py-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4">
              <div className="text-xs text-gray-500">Location</div>
              <div className="mt-1 text-sm text-gray-400">Select state / city</div>
            </div>

            <div className="md:col-span-4 md:border-l md:pl-6">
              <div className="text-xs text-gray-500">Land Size</div>
              <div className="mt-1 text-sm text-gray-400">Select area</div>
            </div>

            <div className="md:col-span-3 md:border-l md:pl-6">
              <div className="text-xs text-gray-500">Budget</div>
              <div className="mt-1 text-sm text-gray-400">Price range</div>
            </div>

            <div className="md:col-span-1 flex gap-3 justify-end">
              <Link
                to="/search"
                className="px-4 py-2 bg-accent text-white rounded-md font-semibold"
              >
                Find
              </Link>
            </div>
          </div>
        </section>

        {/* ================= FEATURED PROPERTIES ================= */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Featured Properties
            </h2>
            <Link
              to="/search"
              className="text-primary-600 font-medium text-sm"
            >
              View all
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            {loading ? (
              <div className="text-gray-500 py-10">
                Loading featured properties…
              </div>
            ) : error ? (
              <div className="text-red-600 py-10">{error}</div>
            ) : featured.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <PropertyCard
                  property={{
                    _id: 's1',
                    title: 'Sunny Meadow',
                    price: 6500000,
                    area: 2,
                    unit: 'acre',
                    address: 'Near River'
                  }}
                />
                <PropertyCard
                  property={{
                    _id: 's2',
                    title: 'Green Hill',
                    price: 9800000,
                    area: 3,
                    unit: 'acre',
                    address: 'Hillside'
                  }}
                />
                <PropertyCard
                  property={{
                    _id: 's3',
                    title: 'Orchard Estate',
                    price: 15000000,
                    area: 5,
                    unit: 'acre',
                    address: 'Valley'
                  }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {featured.map((p) => (
                  <PropertyCard key={p._id} property={p} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= TESTIMONIALS + BLOGS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <TestimonialCarousel />
          </div>

          {/* <div>
            <BlogSlider limit={6} />
          </div> */}
        </section>

        {/* ================= CTA BAND ================= */}
        <section className="bg-white rounded-2xl shadow-sm py-12 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold">
              Need help finding the right farmland?
            </h3>
            <p className="text-slate-600 mt-3">
              Our team will help you shortlist properties and connect with
              genuine sellers.
            </p>

            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
