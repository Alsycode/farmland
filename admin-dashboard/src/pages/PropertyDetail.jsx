// path: src/pages/PropertyDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import propertyService from '../services/propertyService';
import { useAuth } from '../context/AuthContext';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await propertyService.get(id);
      if (res.ok) setProperty(res.property);
      else setError(res.error || 'Failed to load property');
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete property?')) return;
    try {
      await propertyService.remove(id);
      navigate('/properties');
    } catch (err) {
      alert('Delete failed: ' + (err?.response?.data?.error || err.message));
    }
  }

  if (loading) return <div className="text-gray-400 p-6">Loading…</div>;
  if (error) return <div className="text-red-400 p-6">{error}</div>;
  if (!property) return <div className="text-gray-400 p-6">Property not found</div>;

  const canEdit =
    user &&
    (user.role === 'admin' ||
      user.role === 'manager' ||
      user._id === property.owner?._id);

  /* ================= neumorphism helpers ================= */

  const card =
    "bg-[#1e2229] rounded-2xl p-6 " +
    "shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#242a32]";

  const inset =
    "bg-[#1e2229] rounded-xl p-4 " +
    "shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  const actionBtn =
    "px-4 py-2 rounded-xl text-sm font-medium transition " +
    "shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32] active:shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  return (
    <div className="text-gray-200 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{property.title}</h2>
        {canEdit && (
          <div className="flex gap-3">
            <Link
              to={`/properties/${id}/edit`}
              className={actionBtn + " text-yellow-400"}
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className={actionBtn + " text-red-400"}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Main card */}
      <div className={card + " space-y-6"}>
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={inset}>
            <div className="text-xs text-gray-400">Price</div>
            <div className="text-xl font-semibold mt-1">
              ₹{property.price?.toLocaleString()}
            </div>
          </div>

          <div className={inset}>
            <div className="text-xs text-gray-400">Area</div>
            <div className="mt-1">
              {property.area} {property.unit}
            </div>
          </div>

          <div className={inset}>
            <div className="text-xs text-gray-400">Status</div>
            <div className="mt-1">{property.status}</div>
          </div>
        </div>

        {/* Address */}
        <div className={inset}>
          <div className="text-xs text-gray-400 mb-1">Address</div>
          <div>{property.address}</div>
        </div>

        {/* Description */}
        <div className={inset}>
          <div className="text-xs text-gray-400 mb-1">Description</div>
          <div className="whitespace-pre-line text-sm leading-relaxed">
            {property.description}
          </div>
        </div>

        {/* Images */}
        <div>
          <div className="text-sm text-gray-400 mb-3">Images</div>
          <div className="flex gap-4 flex-wrap">
            {property.images && property.images.length ? (
              property.images.map((img, i) => (
                <div
                  key={i}
                  className={
                    "w-48 rounded-xl overflow-hidden " +
                    "shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32]"
                  }
                >
                  <img
                    src={img.url}
                    alt={img.filename}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 text-xs text-gray-400">
                    {img.filename}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm">No images</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
