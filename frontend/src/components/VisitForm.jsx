// path: src/components/VisitForm.jsx
import React, { useState } from 'react';
import api from '../services/apiClient';

/**
 * VisitForm posts a visit request / booking to the backend.
 * Payload:
 * { propertyId, name, email, phone, preferredDate, message, offeredPrice }
 */
export default function VisitForm({ propertyId, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [offeredPrice, setOfferedPrice] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const payload = {
      propertyId,
      name,
      email,
      phone,
      preferredDate: date,
      offeredPrice: offeredPrice ? Number(offeredPrice) : undefined,
      message,
    };

    try {
      let res;
      try {
        res = await api.post('/bookings', payload);
      } catch (e1) {
        try {
          res = await api.post('/bookings', payload);
        } catch (e2) {
          res = await api.post('/bookings', payload);
        }
      }

      if (res && res.data && (res.data.ok || res.status === 200 || res.status === 201)) {
        setStatus({ ok: true, msg: 'Visit request submitted' });
        setName('');
        setEmail('');
        setPhone('');
        setDate('');
        setOfferedPrice('');
        setMessage('');
        onSuccess && onSuccess(res.data);
      } else {
        setStatus({ ok: false, msg: res?.data?.error || 'Failed to submit' });
      }
    } catch (err) {
      setStatus({
        ok: false,
        msg: err?.response?.data?.error || err.message || 'Network error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <div className="text-sm font-semibold mb-2">Schedule a visit</div>

      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full border rounded px-2 py-2"
      />

      <input
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border rounded px-2 py-2"
      />

      <input
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full border rounded px-2 py-2"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border rounded px-2 py-2"
      />

      <input
        type="number"
        min="0"
        step="1000"
        value={offeredPrice}
        onChange={(e) => setOfferedPrice(e.target.value)}
        placeholder="Price you want to offer (optional)"
        className="w-full border rounded px-2 py-2"
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message (optional)"
        className="w-full border rounded px-2 py-2"
        rows={3}
      />

      {status && (
        <div className={`text-sm ${status.ok ? 'text-green-600' : 'text-red-600'}`}>
          {status.msg}
        </div>
      )}

      <div className="flex gap-2">
        <button
          disabled={loading}
          className="px-3 py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Request visit'}
        </button>
        <button
          type="button"
          onClick={() => {
            setName('');
            setEmail('');
            setPhone('');
            setDate('');
            setOfferedPrice('');
            setMessage('');
          }}
          className="px-3 py-2 bg-gray-100 rounded"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
