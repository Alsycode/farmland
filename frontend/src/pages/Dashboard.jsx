// path: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import propertyService from '../services/propertyService';
import bookingService from '../services/bookingService';
import favoriteService from '../services/favoriteService';
import SmallPropertyCard from '../components/SmallPropertyCard';

/**
 * User Dashboard (SRS user-facing): shows
 * - My properties (owner) — fetched by listing properties with owner=user._id
 * - My visits/bookings — GET /bookings?user=<id> or ?me=true
 * - My shortlist — localStorage + backend GET /favorites
 *
 * Assumptions:
 * - Backend supports filtering GET /properties?owner=<userId>
 * - Bookings can be queried by GET /bookings?user=<userId> or ?me=true — we'll attempt both patterns.
 * - Favorites: GET /favorites returns user's favorites when auth cookie present.
 */

export default function Dashboard() {
  const { user } = useAuth();
  const [myProperties, setMyProperties] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    async function loadAll() {
      setLoading(true); setError(null);
      try {
        // 1. My properties: try GET /properties?owner=<user._id>
        let propsRes = await propertyService.list({ owner: user._id, limit: 50 });
        let props = propsRes.items || propsRes.data || propsRes.properties || [];
        // fallback: try /properties?ownerEmail=...
        if (!props.length) {
          const alt = await propertyService.list({ ownerEmail: user.email, limit: 50 }).catch(() => ({ items: [] }));
          props = alt.items || alt.data || alt.properties || props;
        }

        // 2. Bookings: try GET /bookings?user=<id> or ?me=true
        let bookingsRes = await bookingService.list({ user: user._id, limit: 50 }).catch(async () => {
          // try ?me=true
          return bookingService.list({ me: true, limit: 50 });
        });
        const bookings = bookingsRes.items || bookingsRes.data || bookingsRes.bookings || [];

        // 3. Favorites: GET /favorites (auth cookie used)
        let favRes = await favoriteService.list({ limit: 100 }).catch(() => ({ items: [] }));
        const favs = favRes.items || favRes.data || favRes.favorites || [];

        if (!mounted) return;
        setMyProperties(props);
        setMyBookings(bookings);
        setMyFavorites(favs);
      } catch (err) {
        if (mounted) setError(err?.response?.data?.error || err.message || 'Failed to load dashboard');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadAll();
    return () => { mounted = false; };
  }, [user]);

  async function cancelBooking(id) {
    if (!confirm('Cancel this visit request?')) return;
    try {
      const res = await bookingService.update(id, { status: 'cancelled' });
      if (res && (res.ok || res.booking || res.data)) {
        setMyBookings((s) => s.map(b => (b._id === id ? (res.booking || res.data || res) : b)));
      }
    } catch (e) {
      alert(e?.response?.data?.error || e.message || 'Failed to cancel');
    }
  }

  async function removeFavorite(id) {
    if (!confirm('Remove from favorites?')) return;
    try {
      await favoriteService.remove(id);
      setMyFavorites((s) => s.filter(f => f._id !== id));
    } catch (e) {
      alert(e?.response?.data?.error || e.message || 'Failed to remove');
    }
  }

  // local shortlist from localStorage
  const localShortlist = (() => {
    try {
      return JSON.parse(localStorage.getItem('shortlist') || '[]');
    } catch (e) { return []; }
  })();

  if (!user) {
    return <div className="text-gray-500">Please <a href="/login" className="text-indigo-600">login</a> to view your dashboard.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My dashboard</h2>

      {loading ? <div className="text-gray-500">Loading…</div> : error ? <div className="text-red-600">{error}</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">My properties</div>
                <a href="/properties/new" className="text-sm text-indigo-600">Create new</a>
              </div>
              {myProperties.length === 0 ? <div className="text-gray-500">You have not listed any properties.</div> : (
                <div className="space-y-2">
                  {myProperties.map(p => <SmallPropertyCard key={p._id} p={p} />)}
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded shadow">
              <div className="font-semibold mb-3">My visit requests</div>
              {myBookings.length === 0 ? <div className="text-gray-500">No visit requests.</div> : (
                <div className="space-y-3">
                  {myBookings.map(b => (
                    <div key={b._id} className="p-3 border rounded flex justify-between items-start">
                      <div>
                        <div className="font-medium">{b.property?.title || b.property}</div>
                        <div className="text-xs text-gray-500">Preferred: {new Date(b.preferredDate || b.createdAt).toLocaleString()}</div>
                        <div className="text-sm mt-1">{b.message}</div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <div className="text-sm">{b.status}</div>
                        {b.status !== 'cancelled' && <button onClick={() => cancelBooking(b._id)} className="px-2 py-1 bg-red-100 rounded text-red-600">Cancel</button>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <div className="font-semibold mb-3">My shortlist</div>

              <div className="space-y-2">
                {/* Backend favorites */}
                {myFavorites.length > 0 ? myFavorites.map(f => (
                  <div key={f._id} className="flex items-center justify-between">
                    <div className="text-sm">{f.property?.title || f.property}</div>
                    <div className="flex gap-2">
                      <a href={`/properties/${f.property?._id || f.property}`} className="text-xs text-indigo-600">View</a>
                      <button onClick={() => removeFavorite(f._id)} className="text-xs text-red-600">Remove</button>
                    </div>
                  </div>
                )) : <div className="text-gray-500">No favorites (backend)</div>}

                <div className="border-t mt-3 pt-3">
                  <div className="font-semibold text-sm mb-2">Local shortlist</div>
                  {localShortlist.length === 0 ? <div className="text-gray-500">No local shortlist</div> : (
                    <div className="space-y-2">
                      {localShortlist.map(id => (
                        <div key={id} className="flex items-center justify-between text-sm">
                          <a href={`/properties/${id}`} className="text-indigo-600">Property {id}</a>
                          <button onClick={() => {
                            const s = JSON.parse(localStorage.getItem('shortlist') || '[]').filter(x => x !== id);
                            localStorage.setItem('shortlist', JSON.stringify(s));
                            // force re-render
                            window.location.reload();
                          }} className="text-xs text-red-600">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <div className="font-semibold mb-2">Account</div>
              <div className="text-sm">Name: {user.name}</div>
              <div className="text-sm">Email: {user.email}</div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
