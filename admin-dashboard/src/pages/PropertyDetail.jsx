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

  if (loading) return <div className="text-gray-500">Loading…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!property) return <div className="text-gray-500">Property not found</div>;

  const canEdit = user && (user.role === 'admin' || user.role === 'manager' || user._id === property.owner?._id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">{property.title}</h2>
        <div className="flex gap-2">
          {canEdit && <Link to={`/properties/${id}/edit`} className="px-3 py-2 bg-yellow-500 text-white rounded">Edit</Link>}
          {canEdit && <button onClick={handleDelete} className="px-3 py-2 bg-red-500 text-white rounded">Delete</button>}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-500">Price</div>
            <div className="text-xl font-bold">₹{property.price?.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Area</div>
            <div>{property.area} {property.unit}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Status</div>
            <div>{property.status}</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Address</div>
          <div>{property.address}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Description</div>
          <div className="whitespace-pre-line">{property.description}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-2">Images</div>
          <div className="flex gap-3 flex-wrap">
            {property.images && property.images.length ? property.images.map((img, i) => (
              <div key={i} className="w-48 border rounded overflow-hidden">
                <img src={img.url} alt={img.filename} className="w-full h-32 object-cover" />
                <div className="p-2 text-xs">{img.filename}</div>
              </div>
            )) : <div className="text-gray-500">No images</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
