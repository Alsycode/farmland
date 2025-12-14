// path: src/components/TestimonialCarousel.jsx
import React, { useState, useEffect } from 'react';

/**
 * Simple testimonial carousel (auto-rotate). SRS: Testimonials on Home.
 * Data is placeholder; Part 2/3 will fetch from backend if available.
 */
const sample = [
  { id: 1, quote: 'Found the perfect plot for my orchard. Smooth process!', author: 'Ramesh K.' },
  { id: 2, quote: 'Great selection and honest owners. Visited 3 farms easily.', author: 'Anita P.' },
  { id: 3, quote: 'Excellent support from the site to schedule visits.', author: 'Vikram S.' }
];

export default function TestimonialCarousel({ items = sample, interval = 4000 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  const cur = items[idx];
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="text-lg italic">“{cur.quote}”</div>
      <div className="mt-3 text-sm text-gray-600">— {cur.author}</div>
      <div className="flex gap-2 mt-4">
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full ${i === idx ? 'bg-indigo-600' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
}
