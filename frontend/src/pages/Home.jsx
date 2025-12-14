// path: src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../components/TestimonialCarousal';
import PropertyCard from '../components/PropertyCard';
import BlogSlider from '../components/BlogSliderPlaceholder';
import propertyService from '../services/propertyService';

/**
 * Home page (updated)
 * - Fetches featured properties from backend via propertyService.list({ featured: true, limit: 6 })
 * - Renders hero, featured properties grid, testimonials, and blog slider
 * - Mobile-first, responsive
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
        // call backend; propertyService.list uses apiClient (axios with credentials & baseURL)
        const res = await propertyService.list({ featured: true, limit: 6 });
        // common shapes: { ok, items, meta } or { items } or direct array
        const items = res?.items || res?.data || res?.properties || (Array.isArray(res) ? res : []);
        if (mounted) setFeatured(items);
      } catch (err) {
        if (mounted) {
          setError(err?.response?.data?.error || err?.message || 'Failed to load featured properties');
          setFeatured([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadFeatured();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="bg-white rounded shadow p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Find the perfect farmland for your needs</h1>
          <p className="text-gray-600 mb-4">Explore verified farmland listings, shortlist favorites, schedule visits and contact owners directly.</p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/search" className="px-4 py-2 bg-indigo-600 text-white rounded shadow">Search properties</Link>
            <Link to="/explore" className="px-4 py-2 bg-gray-100 rounded shadow">Explore map</Link>
            <Link to="/blogs" className="px-4 py-2 bg-white border rounded shadow">Read our blog</Link>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-indigo-50 p-4 rounded">
            <div className="text-sm text-gray-600">Quick search</div>
            <Link to="/search" className="block mt-3 px-3 py-2 bg-white rounded text-center">Start searching</Link>
            <div className="mt-4 text-xs text-gray-500">
              Trusted listings • Verified owners • Secure contact
            </div>
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured properties</h2>
          <Link to="/search" className="text-sm text-indigo-600">View all</Link>
        </div>

        <div className="bg-white p-4 rounded shadow">
          {loading ? (
            <div className="text-gray-500 py-6">Loading featured properties…</div>
          ) : error ? (
            <div className="text-red-600 py-6">{error}</div>
          ) : (featured.length === 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* graceful fallback samples */}
              <PropertyCard property={{ _id: 's1', title: 'Sunny Meadow', price: 6500000, area: 2, unit: 'acre', address: 'Near River' }} />
              <PropertyCard property={{ _id: 's2', title: 'Green Hill', price: 9800000, area: 3, unit: 'acre', address: 'Hillside' }} />
              <PropertyCard property={{ _id: 's3', title: 'Orchard Estate', price: 15000000, area: 5, unit: 'acre', address: 'Valley' }} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featured.map(p => <PropertyCard key={p._id} property={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials + Blogs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TestimonialCarousel />
        </div>

        <div>
          {/* BlogSlider fetches /api/blogs and renders a horizontal slider */}
          <BlogSlider limit={6} />
        </div>
      </section>

      {/* Small CTA band */}
      <section className="bg-white p-6 rounded shadow text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold">Need help finding the right farmland?</h3>
          <p className="text-gray-600 mt-2">Contact us and our team will assist you in narrowing down properties that match your needs.</p>
          <div className="mt-4">
            <Link to="/contact" className="px-4 py-2 bg-indigo-600 text-white rounded">Contact support</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
