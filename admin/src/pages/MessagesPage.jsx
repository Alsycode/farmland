// frontend/src/pages/MessagesPage.jsx
import React, { useEffect, useState } from 'react';
import client from '../api';

export default function MessagesPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ to: '', subject: '', body: '' });

  useEffect(()=>{ load(); }, []);

  async function load() {
    try {
      const r = await client.get('/messages');
      setRows(r.data.data || []);
    } catch (err) { console.error(err); }
  }

  async function send(e) {
    e.preventDefault();
    try {
      await client.post('/messages', form);
      setForm({ to: '', subject: '', body: '' });
      load();
    } catch (err) { alert('Send failed'); }
  }

  return (
    <div>
      <h1>Messages</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 12 }}>
        <div>
          {rows.map(m => (
            <div key={m._id} style={{ background: 'var(--card-bg)', padding: 12, borderRadius: 10, marginBottom: 8 }}>
              <div style={{ fontWeight:700 }}>{m.subject || '(no subject)'}</div>
              <div style={{ color: 'gray' }}>From: {m.from?.name} — To: {m.to?.name}</div>
              <div style={{ marginTop: 8 }}>{m.body}</div>
            </div>
          ))}
          {rows.length === 0 && <div style={{ color: 'gray' }}>No messages</div>}
        </div>

        <aside style={{ background: 'var(--card-bg)', padding: 12, borderRadius: 10 }}>
          <h3>Send Message</h3>
          <form onSubmit={send}>
            <label>To (user id)</label>
            <input value={form.to} onChange={(e)=>setForm({...form,to:e.target.value})} className="input" />
            <label style={{ marginTop: 8 }}>Subject</label>
            <input value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} className="input" />
            <label style={{ marginTop: 8 }}>Message</label>
            <textarea value={form.body} onChange={(e)=>setForm({...form,body:e.target.value})} className="input" style={{ minHeight: 120 }} />
            <div style={{ marginTop: 8 }}>
              <button type="submit" style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--brand-primary)', color: 'white', border: 'none' }}>Send</button>
            </div>
          </form>
        </aside>
      </div>

      <style>{`.input{width:100%;padding:8px;border-radius:8px;border:1px solid rgba(0,0,0,0.08)}`}</style>
    </div>
  );
}
