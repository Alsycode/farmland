import React, { useState } from 'react';
import messageService from '../services/messageService';
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";

export default function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await messageService.send({
        fromEmail: email,
        name,
        subject,
        content,
      });

      if (res && (res.ok || res.success || res.message)) {
        setStatus({ ok: true, msg: 'Message sent — we will respond shortly.' });
        setEmail('');
        setName('');
        setSubject('');
        setContent('');
      } else {
        setStatus({ ok: false, msg: res?.error || 'Failed to send message' });
      }
    } catch (err) {
      setStatus({
        ok: false,
        msg: err?.response?.data?.error || err.message || 'Failed to send',
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `
    w-full px-4 py-3 rounded-xl text-sm
    bg-[#eef4ee] text-green-900 placeholder-green-700
    shadow-[inset_2px_2px_4px_#cfd8cf,inset_-2px_-2px_4px_#ffffff]
    focus:outline-none
  `;

  return (
    <section className="bg-[#eef4ee] py-20">
      <div className="max-w-6xl mx-auto px-4">

        <div className="
          grid grid-cols-1 lg:grid-cols-2 gap-8
          bg-[#eef4ee] rounded-3xl p-8
          shadow-[8px_8px_16px_#cfd8cf,-8px_-8px_16px_#ffffff]
        ">

          {/* ================= LEFT : NEUMORPHIC FORM ================= */}
          <div>
            <h2 className="text-xl font-semibold text-green-900">
              Get in Touch
            </h2>
            <p className="text-sm text-green-700 mt-2">
              Tell us briefly what your question is about. The more details you
              share, the easier it is for us to help you.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">

              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="email"
                placeholder="We’ll get back to you here"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={inputClass}
              />

              <input
                type="text"
                placeholder="What’s this about?"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className={inputClass}
              />

              <textarea
                rows="4"
                placeholder="Tell us how we can help"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                className={inputClass}
              />

              <label className="flex items-start gap-2 text-xs text-green-700">
                <input type="checkbox" required className="mt-1 accent-green-600" />
                I agree that my data will be processed for responding to my request.
              </label>

              {status && (
                <div
                  className={`text-sm ${
                    status.ok ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {status.msg}
                </div>
              )}

              <button
                disabled={loading}
                className="
                  w-full py-3 rounded-xl text-sm font-medium text-white
                  bg-green-600
                  shadow-[3px_3px_6px_#9fbfa2,-3px_-3px_6px_#dff1e2]
                  hover:bg-green-700
                  disabled:opacity-60
                "
              >
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* ================= RIGHT : CONTACT INFO (UNCHANGED) ================= */}
          <div className="flex flex-col space-y-6 h-full">
            <div>
              <h3 className="text-lg font-semibold text-green-900">
                Prefer a Direct approach
              </h3>

              <div className="mt-4 space-y-3 text-sm text-green-800">
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

            {/* MAP CARD */}
            <div className="relative rounded-2xl overflow-hidden bg-green-100 flex-1">
              <div className="absolute inset-0 bg-[url('/map.webp')] bg-cover opacity-30" />

              <div className="
                absolute bottom-4 left-4 bg-[#eef4ee]
                rounded-xl p-4 shadow
                max-w-[260px]
              ">
                <h4 className="font-semibold text-green-900 text-sm">
                  Visit our office
                </h4>

                <div className="flex items-start gap-2 mt-2 text-xs text-green-700">
                  <MapPin size={14} />
                  <span>Brunnsparken, 123 43, Göteborg.</span>
                </div>

                <button className="
                  mt-3 flex items-center gap-2
                  text-xs font-medium text-green-900
                  border border-green-300
                  rounded-full px-3 py-1.5
                  hover:bg-green-100 transition
                ">
                  Get Directions
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
