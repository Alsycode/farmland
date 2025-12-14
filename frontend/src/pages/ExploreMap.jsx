// // path: src/pages/ExploreMap.jsx
// import React, { useEffect, useState } from 'react';
// import propertyService from '../services/propertyService';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Link } from 'react-router-dom';

// /**
//  * ExploreMap page (SRS: full map with pinned properties).
//  * - Default center: Bengaluru, India (12.9716, 77.5946)
//  */

// const defaultIcon = new L.Icon({
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function ExploreMap() {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // Bengaluru, India
//   const [center, setCenter] = useState([12.9716, 77.5946]);

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       try {
//         setLoading(true);
//         const res = await propertyService.list({ limit: 500 });
//         const items = res.items || res.data || res.properties || [];
//         if (!mounted) return;
//         const withGeo = items.filter(
//           (p) =>
//             (p.location && p.location.lat && p.location.lng) ||
//             (p.geo && p.geo.coordinates)
//         );
//         setProperties(withGeo);
//         if (withGeo.length) {
//           const first = withGeo[0];
//           if (first.location && first.location.lat && first.location.lng)
//             setCenter([first.location.lat, first.location.lng]);
//           else if (first.geo && first.geo.coordinates)
//             setCenter([first.geo.coordinates[1], first.geo.coordinates[0]]);
//         }
//       } catch (err) {
//         setProperties([]);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Explore map</h2>
//       <div className="bg-white rounded shadow">
//         {loading ? (
//           <div className="p-6 text-gray-500">Loading properties…</div>
//         ) : properties.length === 0 ? (
//           <div className="p-6 text-gray-500">No properties with geolocation found.</div>
//         ) : (
//           <div style={{ height: '70vh' }}>
//             <MapContainer center={center} zoom={6} style={{ height: '100%', width: '100%' }}>
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               {properties.map((p) => {
//                 let latlng = null;
//                 if (p.location && p.location.lat && p.location.lng)
//                   latlng = [p.location.lat, p.location.lng];
//                 else if (p.geo && p.geo.coordinates)
//                   latlng = [p.geo.coordinates[1], p.geo.coordinates[0]];
//                 if (!latlng) return null;
//                 return (
//                   <Marker key={p._id} position={latlng} icon={defaultIcon}>
//                     <Popup minWidth={200}>
//                       <div>
//                         <div className="font-semibold">{p.title}</div>
//                         <div className="text-xs text-gray-600">
//                           ₹{p.price?.toLocaleString() || '—'}
//                         </div>
//                         <div className="mt-2">
//                           <Link
//                             to={`/properties/${p._id}`}
//                             className="px-2 py-1 bg-indigo-600 text-white text-xs rounded"
//                           >
//                             View
//                           </Link>
//                         </div>
//                       </div>
//                     </Popup>
//                   </Marker>
//                 );
//               })}
//             </MapContainer>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// path: src/pages/ExploreMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Placeholder properties (Bengaluru area)
const MOCK_PROPERTIES = [
  {
    _id: 'mock-1',
    title: 'Farmland near Bengaluru North',
    price: 1500000,
    lat: 13.0500,
    lng: 77.6200,
  },
  {
    _id: 'mock-2',
    title: 'Premium Farmland near Tumakuru Road',
    price: 2200000,
    lat: 13.1200,
    lng: 77.4000,
  },
  {
    _id: 'mock-3',
    title: 'Green Plot near Kanakapura',
    price: 1800000,
    lat: 12.6000,
    lng: 77.4200,
  },
];

export default function ExploreMap() {
  // Center: Bengaluru
  const center = [12.9716, 77.5946];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Explore map</h2>
      <div className="bg-white rounded shadow">
        <div style={{ height: '70vh' }}>
          <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {MOCK_PROPERTIES.map((p) => (
              <Marker
                key={p._id}
                position={[p.lat, p.lng]}
                icon={defaultIcon}
              >
                <Popup minWidth={200}>
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-600">
                      ₹{p.price.toLocaleString()}
                    </div>
                    <div className="mt-2">
                      <Link
                        to={`/properties/${p._id}`}
                        className="px-2 py-1 bg-indigo-600 text-white text-xs rounded"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
