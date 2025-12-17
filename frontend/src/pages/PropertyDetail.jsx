import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propertyService from '../services/propertyService';

import ImageGallery from '../components/ImageGallery';
import VisitForm from '../components/VisitForm';
import AmenitiesSection from '../components/AmenetiesSection';
import Masterplan from '../components/MasterPlan';
import Overview from '../components/Overview';

/**
 * PropertyDetail Page
 * - Gallery scrolls normally
 * - Sticky form activates only after gallery
 * - Left content scrolls freely
 * - Right-side VisitForm + Call + WhatsApp stay sticky together
 */
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
    <>
      {/* ================= GALLERY (NORMAL SCROLL) ================= */}
      <ImageGallery media={media} />

      {/* ================= PAGE CONTENT ================= */}
      <div className="bg-[#eef4ee] py-10">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex gap-8 items-start">

            {/* ================= LEFT COLUMN ================= */}
            <div className="flex-1 space-y-10">

              {/* SUMMARY */}
              <div
                className="
                  bg-[#eef4ee] rounded-3xl p-6
                  shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
                "
              >
                <h1 className="text-2xl font-semibold text-green-900">
                  {property.title}
                </h1>
                <p className="text-green-700 mt-1">
                  {property.address}
                </p>

                <div className="mt-4 flex flex-wrap gap-6 text-sm">
                  <Stat
                    label="Price"
                    value={`₹${property.price?.toLocaleString() || '—'}`}
                  />
                  <Stat
                    label="Area"
                    value={`${property.area || '—'} ${property.unit || ''}`}
                  />
                  <Stat
                    label="Bedrooms"
                    value={property.bedrooms || '—'}
                  />
                  <Stat
                    label="Bathrooms"
                    value={property.bathrooms || '—'}
                  />
                </div>
              </div>

              {/* OVERVIEW */}
              <Overview property={property} />

              {/* LOCATION */}
              <section>
                <h3 className="text-lg font-semibold text-green-900 mb-3">
                  Location Map
                </h3>
                <div className="rounded-2xl overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=ramanagara&t=&z=10&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    title="map"
                  />
                </div>
              </section>

              {/* AMENITIES */}
              <AmenitiesSection items={property.amenities || []} />

              {/* MASTER PLAN */}
              <Masterplan src={property.masterPlanImage} />

            </div>

            {/* ================= RIGHT COLUMN (STICKY) ================= */}
            <aside className="hidden lg:block w-[360px]">
              {/* Sticky starts ONLY after gallery */}
              <div className="sticky top-24">
                <ContactCard property={property} />
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

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
    <div
      className="
        bg-[#eef4ee] rounded-3xl p-5 space-y-5
        border border-green-200
        shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]
      "
    >
      {/* AGENT */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-green-200 flex items-center justify-center">
          🏡
        </div>
        <div>
          <div className="font-semibold text-green-900">
            Modern House Real Estate
          </div>
          <div className="text-sm text-green-700 hover:underline cursor-pointer">
            View Listings
          </div>
        </div>
      </div>

      {/* VISIT FORM */}
      <VisitForm propertyId={property._id} />

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <a
          href="tel:+918891581416"
          className="
            text-center py-2.5 rounded-xl
            border border-green-600 text-green-800 font-medium
          "
        >
          Call
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="
            text-center py-2.5 rounded-xl
            bg-green-600 text-white font-medium
          "
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
