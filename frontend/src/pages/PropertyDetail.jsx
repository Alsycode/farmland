// src/pages/PropertyDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../services/propertyService';

import ImageGallery from '../components/ImageGallery';
import VisitForm from '../components/VisitForm';
import AmenitiesSection from '../components/AmenetiesSection';
import Masterplan from '../components/MasterPlan';
import Overview from '../components/Overview';

export default function PropertyDetail() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProperty() {
      try {
        const res = await propertyService.get(id);
        if (!mounted) return;
        setProperty(res.property || res.data || res);
      } catch (e) {
        setError(e?.message || 'Failed to load property');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProperty();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="py-20 text-center">Loading…</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;
  if (!property) return <div className="text-center">Property not found</div>;

  const media = [
    ...(property.images || []).map(i => ({ type: 'image', url: i.url })),
    ...(property.videos || []).map(v => ({ type: 'video', url: v.url })),
  ];

  return (
    <div className="bg-[#eef4ee] py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* RESPONSIVE LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* ================= LEFT COLUMN ================= */}
          <div className="w-full lg:flex-1 space-y-8 lg:space-y-10">

            {/* CAROUSEL */}
            <div className="rounded-3xl overflow-hidden shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]">
              <ImageGallery media={media} />
            </div>

            {/* SUMMARY */}
            <div className="bg-[#eef4ee] rounded-3xl p-4 sm:p-6 shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]">
              <h1 className="text-xl sm:text-2xl font-semibold text-green-900">
                {property.title}
              </h1>
              <p className="text-green-700 mt-1 text-sm sm:text-base">
                {property.address}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 sm:gap-6 text-sm">
                <Stat label="Price" value={`₹${property.price?.toLocaleString() || '—'}`} />
                <Stat label="Area" value={`${property.area || '—'} ${property.unit || ''}`} />
              </div>
            </div>

            <Overview />

            {/* DESCRIPTION */}
            <section className="bg-[#eef4ee] rounded-3xl p-4 sm:p-6 shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff] prose prose-green max-w-none">
              <div dangerouslySetInnerHTML={{ __html: property.description }} />
            </section>

            {/* LOCATION */}
            <section>
              <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-3">
                Location Map
              </h3>
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=12.7226,77.2815&z=15&output=embed"
                  className="w-full h-[280px] sm:h-[360px] lg:h-[420px]"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </section>

            {/* AMENITIES */}
            <AmenitiesSection items={property.amenities || []} />

            {/* MASTER PLAN */}
            <Masterplan src={property.masterPlanImage} />
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <aside className="w-full lg:w-[360px]">
            <div className="lg:sticky lg:top-24">
              <ContactCard property={property} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-semibold text-green-900">{value}</div>
      <div className="text-xs text-green-700">{label}</div>
    </div>
  );
}

function ContactCard({ property }) {
  const whatsappLink = `https://wa.me/918891581416?text=${encodeURIComponent(
    `Hi, I'm interested in "${property.title}"`
  )}`;

  return (
    <div className="bg-[#eef4ee] rounded-3xl p-5 space-y-5 border border-green-200 shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]">
      <VisitForm propertyId={property._id} />

      <div className="grid grid-cols-2 gap-2 pt-2">
        <a
          href="tel:+918891581416"
          className="text-center py-2.5 rounded-xl border border-green-600 text-green-800 font-medium"
        >
          Call
        </a>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="text-center py-2.5 rounded-xl bg-green-600 text-white font-medium"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
