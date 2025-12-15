import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyService from '../services/propertyService';
import ImageGallery from '../components/ImageGallery';
import VisitForm from '../components/VisitForm';
import ShortlistButton from '../components/ShortlistButton';
import { API_BASE_URL } from '../config/apiConfig';
import Overview from "../components/Overview"
import Masterplan from "../components/MasterPlan"
import AmenitiesSection from '../components/AmenetiesSection';
export default function PropertyDetail() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVisitModal, setShowVisitModal] = useState(false);

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

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!property) return <div>Property not found</div>;

  const media = [
    ...(property.images || []).map(i => ({ type: 'image', url: i.url })),
    ...(property.videos || []).map(v => ({ type: 'video', url: v.url }))
  ];

  const ownerPhone = property.owner?.phone || property.contactPhone;
  const whatsappNumber = "+918891581416";
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hi, I'm interested in "${property.title}" (ID: ${id})`
      )}`
    : null;

  return (
    <>
      <ImageGallery media={media} />

      
      
      <div className='w-full flex  flex-col justify-center items-center'>
      <div className="bg-white p-6 rounded-xl w-5xl shadow mt-4">
  {/* TOP ROW */}
  <div className="flex flex-wrap items-start justify-between gap-6">
 
    <div className="flex items-start gap-4">
  
      <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-semibold">
        LOGO
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {property.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {property.address}
        </p>
      </div>
    </div>

    <div className="flex border border-green-300 rounded-xl overflow-hidden text-sm">
      <div className="px-5 py-3 border-r">
        <div className="font-semibold text-gray-900">
          ₹{property.price?.toLocaleString() || '—'}
        </div>
        <div className="text-xs text-green-600 mt-1">
          Price
        </div>
      </div>

      <div className="px-5 py-3 border-r">
        <div className="font-semibold text-gray-900">
          {property.area} {property.unit}
        </div>
        <div className="text-xs text-green-600 mt-1">
          Plot Area
        </div>
      </div>

      <div className="px-5 py-3">
        <div className="font-semibold text-gray-900">
          ₹{property.pricePerSqFt || '—'}
        </div>
        <div className="text-xs text-green-600 mt-1">
          Price / Sq.Ft
        </div>
      </div>
    </div>
  </div>

 
  <div className="mt-6 flex flex-wrap items-center gap-3">
 
    <button
      onClick={() => setShowVisitModal(true)}
      className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
    >
      📅 Schedule Visit
    </button>

    {whatsappLink && (
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-gray-900 rounded-lg text-sm font-medium hover:bg-yellow-500 transition"
      >
        💬 Chat with Seller
      </a>
    )}

   
    <div className="px-5 py-2.5  border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
      <ShortlistButton propertyId={property._id} />
    </div>

    <button
      onClick={() => navigator.share?.({
        title: property.title,
        url: window.location.href
      })}
      className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      title="Share"
    >
      🔗
    </button>
  </div>
</div>
<div className='w-full max-w-5xl'>
    <section className="mt-8">
              <h3 className="text-xl font-semibold mb-4">LOCATION MAP</h3>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <iframe
                  src="https://maps.google.com/maps?q=ramanagara&t=&z=10&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="420"
                  className="rounded"
                  title="location-map"
                  style={{ border: 0 }}
                />
              </div>
            </section>
</div>
   <div className="mt-8 max-w-5xl w-full">
              {/* If you already have an AmenitiesGrid component you can pass property.amenities to it.
                  Here we render a full AMENITIES section based on property.amenities array. */}
              <AmenitiesSection items={property.amenities || []} />
            </div>

             <div className="mt-10 max-w-5xl w-full">
                          <Masterplan src={property.masterPlanImage} />
                        </div>
      </div>
      




      {/* VISIT MODAL */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md p-5 rounded-lg relative">
            <button
              onClick={() => setShowVisitModal(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-3">
              Schedule a Visit
            </h3>

            <VisitForm
              propertyId={property._id}
              onSuccess={() => setShowVisitModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
