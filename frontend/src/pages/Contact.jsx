// path: src/pages/Contact.jsx
import React, { useState } from 'react';
import messageService from '../services/messageService';

/**
 * Contact page — sends messages to backend via POST /api/messages (messageService.send)
 * SRS: Contact form (visitor) and office info
 */
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";
export default function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(null);
 const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
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
      {/* <h2 className="text-2xl font-semibold mb-4">Contact us</h2> */}
      <div className="">
        {/* <form onSubmit={submit} className="bg-white p-6 rounded shadow">
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
        </form> */}
 <section className="bg-[#f8fafc] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl p-8 shadow-sm">
          {/* ================= LEFT : FORM ================= */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Get in Touch
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Tell us briefly what your question is about – donations,
              partnerships, volunteering, media, or something else. The
              more details you share, the easier it is for us to help you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your full Name"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="We’ll get back to you here"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select className="w-full border rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>How can we help you?</option>
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Partnership</option>
              </select>

              <input
                type="text"
                placeholder="What’s this about?"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                rows="4"
                placeholder="Tell us how we can help"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="flex items-start gap-2 text-xs text-gray-500">
                <input type="checkbox" className="mt-1" />
                I agree that my data will be processed for the purpose of
                responding to my request.
              </label>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition">
                Subscribe
              </button>
            </form>
          </div>

          {/* ================= RIGHT : CONTACT INFO ================= */}
          <div className="flex flex-col space-y-6 h-full">

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Prefer a Direct approach
              </h3>

              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Phone size={16} />
                  <span>+46 00 00 00 10</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  <span>contact@mail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={16} />
                  <span>Monday to Friday, 08:00–17:00</span>
                </div>
              </div>
            </div>

            {/* ================= MAP CARD ================= */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex-1">
              {/* Fake Map Background */}
              <div className="absolute inset-0 bg-[url('/map.webp')] bg-cover opacity-30" />

              {/* Map Overlay Card */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow max-w-[260px]">
                <h4 className="font-semibold text-gray-900 text-sm">
                  Visit our office
                </h4>

                <div className="flex items-start gap-2 mt-2 text-xs text-gray-600">
                  <MapPin size={14} />
                  <span>Brunnsparken, 123 43, Göteborg.</span>
                </div>

                <button className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-900 border rounded-full px-3 py-1.5 hover:bg-gray-100 transition">
                  Get a Direction
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        {/* <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-2">Office</h3>
          <div className="text-sm text-gray-700 mb-2">Farmland Operations</div>
          <div className="text-sm text-gray-600">Email: email@farmland.example</div>
          <div className="text-sm text-gray-600">Phone: +91 98765 43210</div>

          <div className="mt-4">
            <h4 className="font-semibold mb-1">Visit us</h4>
            <div className="text-sm text-gray-600">Address: 123 Farmland Road, Green Valley</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
