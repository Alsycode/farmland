// frontend/src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from 'react';
import client from '../api';

export default function FavoritesPage() {
  const [rows, setRows] = useState([]);

  useEffect(()=>{ load(); }, []);

  async function load() {
    try {
      const r = await client.get('/favorites');
      setRows(r.data.data || []);
    } catch (err) { console.error(err); }
  }

  async function remove(id) {
    try {
      await client.delete(`/favorites/${id}`);
      load();
    } catch (err) { alert('Remove failed'); }
  }

  return (
    <div>
      <h1>Favorites</h1>
      <div style={{ marginTop: 12 }}>
        {rows.map(f => (
          <div key={f._id} style={{ background: 'var(--card-bg)', padding: 12, borderRadius: 10, marginBottom: 8 }}>
            <div style={{ fontWeight:700 }}>{f.listing?.title}</div>
            <div style={{ color: 'gray' }}>{f.listing?.address}</div>
            <div style={{ marginTop: 8 }}>
              <button onClick={()=>window.open(`/properties/${f.listing?._id}`, '_blank')}>View</button>
              <button onClick={()=>remove(f._id)} style={{ marginLeft: 8, color: 'crimson' }}>Remove</button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div style={{ color: 'gray' }}>No favorites</div>}
      </div>
    </div>
  );
}
