// path: src/components/MobileActionBar.jsx
import React from 'react';
import ShortlistButton from './ShortlistButton';

/**
 * MobileActionBar - fixed bottom bar on small screens for quick actions:
 * WhatsApp, Call, Shortlist, Request visit (scrolls to VisitForm)
 * Props: phone, whatsappLink, propertyId
 */
export default function MobileActionBar({ phone, whatsappLink, propertyId }) {
  function goToVisit() {
    const el = document.querySelector('form[data-visit-form]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
      <div className="bg-white shadow rounded flex items-center justify-between px-3 py-2 gap-2">
        {whatsappLink ? <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1 text-center bg-green-500 text-white rounded px-2 py-2">WhatsApp</a> : <div className="flex-1 text-center text-gray-400">No WhatsApp</div>}
        {phone ? <a href={`tel:${phone}`} className="px-3 py-2 bg-gray-100 rounded">Call</a> : null}
        <button onClick={goToVisit} className="px-3 py-2 bg-indigo-600 text-white rounded">Visit</button>
        <div><ShortlistButton propertyId={propertyId} /></div>
      </div>
    </div>
  );
}
