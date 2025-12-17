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
      setLoading(true);
      setError(null);
      try {
        let propsRes = await propertyService.list({ owner: user._id, limit: 50 });
        let props = propsRes.items || propsRes.data || propsRes.properties || [];

        if (!props.length) {
          const alt = await propertyService
            .list({ ownerEmail: user.email, limit: 50 })
            .catch(() => ({ items: [] }));
          props = alt.items || alt.data || alt.properties || props;
        }

        let bookingsRes = await bookingService
          .list({ user: user._id, limit: 50 })
          .catch(() => bookingService.list({ me: true, limit: 50 }));
        const bookings =
          bookingsRes.items || bookingsRes.data || bookingsRes.bookings || [];

        let favRes = await favoriteService
          .list({ limit: 100 })
          .catch(() => ({ items: [] }));
        const favs = favRes.items || favRes.data || favRes.favorites || [];

        if (!mounted) return;
        setMyProperties(props);
        setMyBookings(bookings);
        setMyFavorites(favs);
      } catch (err) {
        if (mounted)
          setError(
            err?.response?.data?.error ||
              err.message ||
              'Failed to load dashboard'
          );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAll();
    return () => {
      mounted = false;
    };
  }, [user]);

  if (!user) {
    return (
      <div className="bg-[#eef4ee] min-h-screen flex items-center justify-center text-green-800">
        Please{' '}
        <a href="/login" className="text-green-600 underline ml-1">
          login
        </a>{' '}
        to view your dashboard.
      </div>
    );
  }

  const card =
    "bg-[#eef4ee] rounded-3xl p-6 shadow-[6px_6px_12px_#cfd8cf,-6px_-6px_12px_#ffffff]";

  const inset =
    "bg-[#eef4ee] rounded-2xl p-4 shadow-[inset_3px_3px_6px_#cfd8cf,inset_-3px_-3px_6px_#ffffff]";

  return (
    <div className="min-h-screen bg-[#eef4ee] px-4 py-10">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-semibold text-green-900 mb-8">
          My Dashboard
        </h2>

        {loading ? (
          <div className="text-green-700">Loading…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">

              {/* My Properties */}
              <section className={card}>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-semibold text-green-900">
                    My properties
                  </h3>
                  <a
                    href="/properties/new"
                    className="text-sm text-green-700 hover:underline"
                  >
                    Create new
                  </a>
                </div>

                {myProperties.length === 0 ? (
                  <div className="text-green-700">
                    You have not listed any properties.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myProperties.map((p) => (
                      <div key={p._id} className={inset}>
                        <SmallPropertyCard p={p} />
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Bookings */}
              <section className={card}>
                <h3 className="font-semibold text-green-900 mb-5">
                  My visit requests
                </h3>

                {myBookings.length === 0 ? (
                  <div className="text-green-700">No visit requests.</div>
                ) : (
                  <div className="space-y-5">
                    {myBookings.map((b) => (
                      <div
                        key={b._id}
                        className={`${inset} flex justify-between gap-6`}
                      >
                        <div>
                          <div className="font-medium text-green-900">
                            {b.property?.title || b.property}
                          </div>
                          <div className="text-xs text-green-700">
                            Preferred:{' '}
                            {new Date(
                              b.preferredDate || b.createdAt
                            ).toLocaleString()}
                          </div>
                          <div className="text-sm mt-2 text-green-800">
                            {b.message}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-amber-600">
                            {b.status}
                          </span>
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => cancelBooking(b._id)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* RIGHT */}
            <aside className="space-y-8">

              {/* Shortlist */}
              <section className={card}>
                <h3 className="font-semibold text-green-900 mb-4">
                  My shortlist
                </h3>

                {myFavorites.length > 0 ? (
                  <div className="space-y-3 text-sm">
                    {myFavorites.map((f) => (
                      <div
                        key={f._id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-green-800">
                          {f.property?.title || f.property}
                        </span>
                        <div className="flex gap-3">
                          <a
                            href={`/properties/${f.property?._id || f.property}`}
                            className="text-green-700 hover:underline"
                          >
                            View
                          </a>
                          <button
                            onClick={() => removeFavorite(f._id)}
                            className="text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-green-700">No favorites</div>
                )}
              </section>

              {/* Account */}
              <section className={card}>
                <h3 className="font-semibold text-green-900 mb-4">
                  Account
                </h3>
                <div className="text-sm text-green-800">
                  Name: {user.name}
                </div>
                <div className="text-sm text-green-800">
                  Email: {user.email}
                </div>
              </section>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
}
