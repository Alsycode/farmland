// path: src/components/VisitForm.jsx
import React, { useState } from 'react';
import api from '../services/apiClient';

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

    try {
      const res = await api.post('/bookings', {
        propertyId,
        name,
        email,
        phone,
        preferredDate: date,
        offeredPrice: offeredPrice ? Number(offeredPrice) : undefined,
        message,
      });

      if (res && (res.status === 200 || res.status === 201)) {
        setStatus({ ok: true, msg: 'Visit request submitted' });
        setName('');
        setEmail('');
        setPhone('');
        setDate('');
        setOfferedPrice('');
        setMessage('');
        onSuccess && onSuccess(res.data);
      } else {
        setStatus({ ok: false, msg: 'Failed to submit' });
      }
    } catch (err) {
      setStatus({
        ok: false,
        msg: err?.response?.data?.error || 'Network error',
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `
    w-full px-3 py-2 rounded-xl
    bg-[#eef4ee] text-green-900 placeholder-green-700
    shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
    focus:outline-none
  `;

  return (
    <form
      onSubmit={submit}
      className="
        bg-[#eef4ee] p-6 rounded-3xl space-y-4
      "
    >
      <div className="text-lg font-semibold text-green-900">
        Schedule a Visit
      </div>

      <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className={inputClass} />
      <input required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className={inputClass} />
      <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" className={inputClass} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />
      <input type="number" min="0" step="1000" value={offeredPrice} onChange={e => setOfferedPrice(e.target.value)} placeholder="Offer price (optional)" className={inputClass} />
      <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder="Message (optional)" className={inputClass} />

      {status && (
        <div className={`text-sm ${status.ok ? 'text-green-700' : 'text-red-600'}`}>
          {status.msg}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          disabled={loading}
          className="
            px-5 py-2 rounded-xl text-sm font-medium text-white
            bg-green-600
            shadow-[2px_2px_4px_#9fbfa2,-2px_-2px_4px_#dff1e2]
            hover:bg-green-700
            disabled:opacity-60
          "
        >
          {loading ? 'Sending…' : 'Request Visit'}
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
          className="
            px-5 py-2 rounded-xl text-sm text-green-900
            bg-[#eef4ee]
            shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
          "
        >
          Clear
        </button>
      </div>
    </form>
  );
}
