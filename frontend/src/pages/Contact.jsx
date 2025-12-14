// path: src/pages/Contact.jsx
import React, { useState } from 'react';
import messageService from '../services/messageService';

/**
 * Contact page — sends messages to backend via POST /api/messages (messageService.send)
 * SRS: Contact form (visitor) and office info
 */

export default function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await messageService.send({ fromEmail: email, name, subject, content });
      // backend shape may be { ok:true, data:... }
      if (res && (res.ok || res.success || res.message)) {
        setStatus({ ok: true, msg: 'Message sent — we will respond shortly.' });
        setEmail(''); setName(''); setSubject(''); setContent('');
      } else {
        setStatus({ ok: false, msg: res.error || 'Failed to send' });
      }
    } catch (err) {
      setStatus({ ok: false, msg: err?.response?.data?.error || err.message || 'Failed to send' });
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Contact us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={submit} className="bg-white p-6 rounded shadow">
          <div className="mb-3">
            <label className="text-sm block mb-1">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="mb-3">
            <label className="text-sm block mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="mb-3">
            <label className="text-sm block mb-1">Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-3">
            <label className="text-sm block mb-1">Message</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full border rounded px-3 py-2" rows="6" required />
          </div>

          {status && <div className={`mb-3 text-sm ${status.ok ? 'text-green-600' : 'text-red-600'}`}>{status.msg}</div>}

          <div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">Send message</button>
          </div>
        </form>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-2">Office</h3>
          <div className="text-sm text-gray-700 mb-2">Farmland Operations</div>
          <div className="text-sm text-gray-600">Email: email@farmland.example</div>
          <div className="text-sm text-gray-600">Phone: +91 98765 43210</div>

          <div className="mt-4">
            <h4 className="font-semibold mb-1">Visit us</h4>
            <div className="text-sm text-gray-600">Address: 123 Farmland Road, Green Valley</div>
          </div>
        </div>
      </div>
    </div>
  );
}
