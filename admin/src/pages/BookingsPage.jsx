// frontend/src/pages/BookingsPage.jsx
import React, { useEffect, useState } from 'react';
import client from '../api';

export default function BookingsPage() {
  const [rows, setRows] = useState([]);

  useEffect(()=>{ load(); }, []);

  async function load() {
    try {
      const r = await client.get('/bookings');
      setRows(r.data.data || []);
    } catch (err) { console.error(err); }
  }

  async function updateStatus(id, status) {
    try {
      await client.put(`/bookings/${id}/status`, { status });
      load();
    } catch (err) { alert('Update failed'); }
  }

  return (
    <div>
      <h1>Bookings</h1>
      <div style={{ marginTop: 12 }}>
        {rows.map(b => (
          <div key={b._id} style={{ background: 'var(--card-bg)', padding: 12, borderRadius: 10, marginBottom: 8 }}>
            <div style={{ fontWeight:700 }}>{b.listing?.title}</div>
            <div style={{ color: 'gray' }}>By: {b.user?.name} — {new Date(b.startDate).toLocaleString()}</div>
            <div style={{ marginTop: 8 }}>
              <span style={{ fontWeight:700, marginRight: 12 }}>{b.status}</span>
              {b.status !== 'confirmed' && <button onClick={()=>updateStatus(b._id, 'confirmed')}>Confirm</button>}
              {b.status !== 'cancelled' && <button onClick={()=>updateStatus(b._id, 'cancelled')} style={{ marginLeft: 8 }}>Cancel</button>}
            </div>
          </div>
        ))}
        {rows.length === 0 && <div style={{ color: 'gray' }}>No bookings yet</div>}
      </div>
    </div>
  );
}
