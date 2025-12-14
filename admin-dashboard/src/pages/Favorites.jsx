// path: src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import favoriteService from '../services/favoriteService';
import propertyService from '../services/propertyService';
import { Link } from 'react-router-dom';

/**
 * Favorites page:
 * - Lists current user's favorites via GET /favorites
 * - Allows removing favorites
 * - Shows linked property details (if available)
 */

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    setLoading(true);
    try {
      const res = await favoriteService.list({ page: 1, limit: 50 });
      if (res.ok) {
        setItems(res.items || []);
        setMeta(res.meta || null);
      } else {
        alert(res.error || 'Failed to load favorites');
      }
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  async function removeFavorite(id) {
    if (!confirm('Remove from favorites?')) return;
    try {
      await favoriteService.remove(id);
      fetchFavorites();
    } catch (err) {
      alert(err?.response?.data?.error || err.message || 'Network error');
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">My Favorites</h2>

      <div className="bg-white p-4 rounded shadow">
        {loading ? (
          <div className="text-gray-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-gray-500">No favorites yet.</div>
        ) : (
          <ul className="space-y-2">
            {items.map(f => (
              <li key={f._id} className="p-3 border rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">{f.property?.title}</div>
                  <div className="text-sm text-gray-500">{f.property?.address}</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/properties/${f.property?._id}`} className="px-3 py-1 bg-gray-100 rounded">View</Link>
                  <button onClick={() => removeFavorite(f._id)} className="px-3 py-1 bg-red-100 rounded text-red-600">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
