// path: src/pages/PropertyDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyService from '../services/propertyService';
import ImageGallery from '../components/ImageGallery';
import VisitForm from '../components/VisitForm';
import ShortlistButton from '../components/ShortlistButton';
import { API_BASE_URL } from '../config/apiConfig';

/**
 * PropertyDetail page:
 * - fetches GET /api/properties/:id
 * - displays gallery (images/videos), details, price, area
 * - provides PDF download link if property.pdfUrl || property.pdf exists
 * - WhatsApp & Call buttons using owner phone if available
 * - includes VisitForm to POST visit request
 * - includes ShortlistButton (localStorage + backend toggle)
 */

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await propertyService.get(id);
        if (!mounted) return;
        // handle common shapes
        const p = res.property || res.data || res;
        setProperty(p);
      } catch (e) {
        setErr(e?.response?.data?.error || e.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="text-gray-500">Loading property…</div>;
  if (err) return <div className="text-red-600">{err}</div>;
  if (!property) return <div className="text-gray-500">Property not found</div>;

  // build media array from property.images and property.videos
  const media = [
    ...(property.images || []).map(img => ({ type: 'image', url: img.url, thumbnail: img.thumb || img.url })),
    ...(property.videos || []).map(v => ({ type: 'video', url: v.url }))
  ];

  const ownerPhone = property.owner?.phone || property.contactPhone || null;
  const ownerName = property.owner?.name || property.contactName || '';

  const pdfUrl = property.pdfUrl || property.pdf || null;
  const whatsappNumber = ownerPhone ? ownerPhone.replace(/\D/g, '') : null;
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I am interested in property ' + (property.title || '') + ' (ID: ' + id + ')')}` : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ImageGallery media={media} />

        <div className="bg-white p-4 rounded shadow mt-4">
          <h2 className="text-2xl font-semibold">{property.title}</h2>
          <div className="text-gray-600 mt-1">{property.address}</div>
          <div className="mt-3 flex gap-3 items-center">
            <div className="text-xl font-bold">₹{property.price?.toLocaleString() || '—'}</div>
            <div className="text-sm text-gray-500">{property.area} {property.unit}</div>
            <ShortlistButton propertyId={property._id} />
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <h4 className="font-semibold">Description</h4>
              <div className="text-gray-700 whitespace-pre-line">{property.description}</div>
            </div>

            <div>
              <h4 className="font-semibold">Amenities</h4>
              <div className="text-sm text-gray-600">{(property.amenities || []).join(', ') || '—'}</div>
            </div>

            <div className="flex gap-2">
              {whatsappLink && <a target="_blank" rel="noreferrer" href={whatsappLink} className="px-3 py-2 bg-green-500 text-white rounded">Message owner (WhatsApp)</a>}
              {ownerPhone && <a href={`tel:${ownerPhone}`} className="px-3 py-2 bg-gray-100 rounded">Call owner</a>}
              {pdfUrl && <a href={pdfUrl.startsWith('http') ? pdfUrl : `${API_BASE_URL}${pdfUrl}`} target="_blank" rel="noreferrer" className="px-3 py-2 bg-indigo-600 text-white rounded">Download PDF</a>}
              <Link to="/explore" className="px-3 py-2 bg-gray-100 rounded">Explore map</Link>
            </div>
          </div>
        </div>

        {/* Related properties (simple placeholder) */}
        <div className="bg-white p-4 rounded shadow mt-4">
          <h3 className="font-semibold mb-2">Related properties</h3>
          <div className="text-gray-500">Related properties will be fetched in a further iteration (SRS: recommended properties).</div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Owner</div>
          <div className="font-medium">{ownerName || property.owner?.email || 'Owner'}</div>
          {ownerPhone && <div className="text-sm text-gray-500">Phone: {ownerPhone}</div>}
          <div className="mt-3">
            <a href={whatsappLink || '#'} target="_blank" rel="noreferrer" className="block px-3 py-2 bg-green-500 text-white rounded mb-2">WhatsApp</a>
            {ownerPhone && <a href={`tel:${ownerPhone}`} className="block px-3 py-2 bg-gray-100 rounded">Call</a>}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <VisitForm propertyId={property._id} onSuccess={() => alert('Visit requested — we will contact you soon.')} />
        </div>
      </aside>
    </div>
  );
}
