// frontend/src/pages/ListingsTable.jsx
import React, { useEffect, useState } from 'react';
import client from '../api';

export default function ListingsTable() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);

  useEffect(()=> { load(); }, [page]);

  async function load() {
    try {
      const r = await client.get('/properties', { params: { q, page, limit: 10, sort: 'newest' } });
      setRows(r.data.data);
      setMeta(r.data.meta);
    } catch (err) {
      console.error(err);
    }
  }

  async function doDelete(id) {
    if (!confirm('Delete property?')) return;
    try {
      await client.delete(`/properties/${id}`);
      load();
    } catch (err) {
      alert('Delete failed');
    }
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <h1>Listings</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="Search title/desc" value={q} onChange={(e)=>setQ(e.target.value)} style={{ padding: 8, borderRadius: 8 }} />
          <button onClick={()=>{ setPage(1); load(); }} style={{ padding: 8, borderRadius: 8, background: 'var(--brand-primary)', color: '#fff', border: 'none' }}>Search</button>
        </div>
      </header>

      <div style={{ marginTop: 12 }}>
        <table style={{ width:'100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'gray' }}>
              <th style={{ padding: 8 }}>Title</th>
              <th>Price</th>
              <th>Area</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r._id} style={{ borderTop: '1px solid #f0f0f0' }}>
                <td style={{ padding: 8 }}>{r.title}</td>
                <td>{r.pricePerAcre}</td>
                <td>{r.area}</td>
                <td>{r.owner?.name || r.owner}</td>
                <td>
                  <button style={{ marginRight: 8 }} onClick={()=>window.open(`/properties/${r._id}`, '_blank')}>View</button>
                  <button style={{ marginRight: 8 }} onClick={()=>alert('Edit page TODO')}>Edit</button>
                  <button onClick={()=>doDelete(r._id)} style={{ color: 'crimson' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{meta ? `Page ${meta.page} of ${meta.pages}` : ''}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button disabled={!meta || meta.page <=1} onClick={()=>setPage(p => Math.max(1,p-1))}>Prev</button>
            <button disabled={!meta || meta.page >= (meta?.pages||1)} onClick={()=>setPage(p => p+1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
