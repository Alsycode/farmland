// path: src/pages/ExploreMap.jsx
import React, { useEffect, useState } from 'react';
import propertyService from '../services/propertyService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

/* ---------- LEAFLET ICON FIX ---------- */
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ExploreMap() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default center: Bengaluru
  const [center, setCenter] = useState([12.9716, 77.5946]);

  useEffect(() => {
    let mounted = true;

    async function fetchProperties() {
      try {
        setLoading(true);

        // fetch many so map has enough markers
        const res = await propertyService.list({ limit: 500 });
        const items = res.items || [];

        // only properties with valid geo coords
        const withGeo = items.filter(
          (p) =>
            p.location &&
            Array.isArray(p.location.coordinates) &&
            p.location.coordinates.length === 2
        );

        if (!mounted) return;

        setProperties(withGeo);

        // auto-center map on first property
        if (withGeo.length) {
          const [lng, lat] = withGeo[0].location.coordinates;
          setCenter([lat, lng]);
        }
      } catch (err) {
        console.error('Failed to load map properties', err);
        setProperties([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProperties();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">
        Explore Map
      </h2>

      <div className="bg-white rounded shadow">
        {loading ? (
          <div className="p-6 text-gray-500">
            Loading properties…
          </div>
        ) : properties.length === 0 ? (
          <div className="p-6 text-gray-500">
            No properties with map coordinates found.
          </div>
        ) : (
          <div style={{ height: '70vh' }}>
            <MapContainer
              center={center}
              zoom={7}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {properties.map((p) => {
                const [lng, lat] = p.location.coordinates;

                return (
                  <Marker
                    key={p._id}
                    position={[lat, lng]}
                    icon={defaultIcon}
                  >
                    <Popup minWidth={220}>
                      <div>
                        <div className="font-semibold">
                          {p.title}
                        </div>

                        <div className="text-xs text-gray-600 mt-1">
                          ₹{p.price?.toLocaleString()} · {p.area} {p.unit}
                        </div>

                        <div className="mt-2">
                          <Link
                            to={`/properties/${p._id}`}
                            className="px-2 py-1 bg-green-700 text-white text-xs rounded"
                          >
                            View details
                          </Link>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}
