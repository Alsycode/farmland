// frontend/src/pages/DashboardHome.jsx
import React, { useEffect, useState } from 'react';
import client from '../api';

export default function DashboardHome() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    async function load() {
      setLoading(true);
      try {
        const r = await client.get('/admin/analytics/summary');
        setSummary(r.data.data);
      } catch (err) {
        // ignore
      } finally { setLoading(false); }
    }
    load();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
        <StatCard title="Users" value={summary?.users ?? '—'} loading={loading} />
        <StatCard title="Listings" value={summary?.listings ?? '—'} loading={loading} />
        <StatCard title="Bookings" value={summary?.bookings ?? '—'} loading={loading} />
        <StatCard title="Favorites" value={summary?.favorites ?? '—'} loading={loading} />
        <StatCard title="Messages" value={summary?.messages ?? '—'} loading={loading} />
      </div>
      <section style={{ marginTop: 18 }}>
        <h2>Recent Listings</h2>
        <RecentListings />
      </section>
    </div>
  );
}

function StatCard({ title, value, loading }) {
  return (
    <div style={{ background: 'var(--card-bg)', padding: 12, borderRadius: 'var(--card-radius)', boxShadow: '0 6px 18px rgba(16,24,40,0.06)' }}>
      <div style={{ fontSize: 12, color: 'gray' }}>{title}</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{loading ? '…' : value}</div>
    </div>
  );
}

function RecentListings() {
  const [data, setData] = useState([]);
  useEffect(()=> {
    client.get('/properties?limit=6&sort=newest').then(r => setData(r.data.data)).catch(()=>{});
  }, []);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginTop: 12 }}>
      {data.map(l => (
        <div key={l._id} style={{ background: 'var(--card-bg)', padding: 12, borderRadius: '12px' }}>
          <div style={{ fontWeight: 700 }}>{l.title}</div>
          <div style={{ color: 'gray', fontSize: 13 }}>{l.address}</div>
          <div style={{ marginTop: 8, fontWeight: 700 }}>{l.pricePerAcre} / acre</div>
        </div>
      ))}
      {data.length === 0 && <div style={{ color: 'gray' }}>No recent listings</div>}
    </div>
  );
}
