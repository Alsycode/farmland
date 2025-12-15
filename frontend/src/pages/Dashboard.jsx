// path: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import propertyService from '../services/propertyService';
import bookingService from '../services/bookingService';
import favoriteService from '../services/favoriteService';
import SmallPropertyCard from '../components/SmallPropertyCard';

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
        let propsRes = await propertyService.list({ owner: user._id, limit: 50 });
        let props = propsRes.items || propsRes.data || propsRes.properties || [];

        if (!props.length) {
          const alt = await propertyService.list({ ownerEmail: user.email, limit: 50 }).catch(() => ({ items: [] }));
          props = alt.items || alt.data || alt.properties || props;
        }

        let bookingsRes = await bookingService.list({ user: user._id, limit: 50 }).catch(() =>
          bookingService.list({ me: true, limit: 50 })
        );
        const bookings = bookingsRes.items || bookingsRes.data || bookingsRes.bookings || [];

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

  const card =
    "bg-[#1e2229] rounded-2xl p-5 shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#242a32]";

  const inset =
    "bg-[#1e2229] rounded-xl p-4 shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  if (!user) {
    return (
      <div className="text-gray-400">
        Please <a href="/login" className="text-indigo-400">login</a> to view your dashboard.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181b20] text-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-6">My Dashboard</h2>

      {loading ? (
        <div className="text-gray-400">Loading…</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Properties */}
            <div className={card}>
              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold">My properties</div>
                <a href="/properties/new" className="text-sm text-indigo-400">Create new</a>
              </div>

              {myProperties.length === 0 ? (
                <div className="text-gray-400">You have not listed any properties.</div>
              ) : (
                <div className="space-y-3">
                  {myProperties.map(p => (
                    <div key={p._id} className={inset}>
                      <SmallPropertyCard p={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bookings */}
            <div className={card}>
              <div className="font-semibold mb-4">My visit requests</div>

              {myBookings.length === 0 ? (
                <div className="text-gray-400">No visit requests.</div>
              ) : (
                <div className="space-y-4">
                  {myBookings.map(b => (
                    <div key={b._id} className={inset + " flex justify-between gap-4"}>
                      <div>
                        <div className="font-medium">{b.property?.title || b.property}</div>
                        <div className="text-xs text-gray-400">
                          Preferred: {new Date(b.preferredDate || b.createdAt).toLocaleString()}
                        </div>
                        <div className="text-sm mt-2 text-gray-300">{b.message}</div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-amber-400">{b.status}</span>
                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => cancelBooking(b._id)}
                            className="text-xs text-red-400"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* Shortlist */}
            <div className={card}>
              <div className="font-semibold mb-4">My shortlist</div>

              {myFavorites.length > 0 ? (
                <div className="space-y-3">
                  {myFavorites.map(f => (
                    <div key={f._id} className="flex justify-between text-sm">
                      <span>{f.property?.title || f.property}</span>
                      <div className="flex gap-3">
                        <a href={`/properties/${f.property?._id || f.property}`} className="text-indigo-400">
                          View
                        </a>
                        <button onClick={() => removeFavorite(f._id)} className="text-red-400">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No favorites</div>
              )}
            </div>

            {/* Account */}
            <div className={card}>
              <div className="font-semibold mb-3">Account</div>
              <div className="text-sm text-gray-300">Name: {user.name}</div>
              <div className="text-sm text-gray-300">Email: {user.email}</div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
