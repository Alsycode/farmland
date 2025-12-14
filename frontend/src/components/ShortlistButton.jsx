// path: src/components/ShortlistButton.jsx
import React, { useState, useEffect } from 'react';
import favoriteService from '../services/favoriteService';
import { useToasts } from '../context/ToastContext';

/**
 * Improved ShortlistButton:
 * - optimistic UI: updates localStorage first, then background sync with favoriteService.toggle
 * - shows toasts on success/error
 * - Accepts propertyId
 */

export default function ShortlistButton({ propertyId }) {
  const [shortlisted, setShortlisted] = useState(false);
  const [busy, setBusy] = useState(false);
  const { push } = useToasts();

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('shortlist') || '[]');
      setShortlisted(s.includes(propertyId));
    } catch (e) {
      setShortlisted(false);
    }
  }, [propertyId]);

  async function toggle() {
    setBusy(true);
    try {
      // optimistic local update
      const s = JSON.parse(localStorage.getItem('shortlist') || '[]');
      let next;
      if (s.includes(propertyId)) {
        next = s.filter(id => id !== propertyId);
        setShortlisted(false);
      } else {
        next = [...s, propertyId];
        setShortlisted(true);
      }
      localStorage.setItem('shortlist', JSON.stringify(next));
      push(shortlisted ? 'Removed from shortlist (local)' : 'Added to shortlist (local)', { type: 'success' });

      // background sync with backend favorites
      try {
        const res = await favoriteService.toggle(propertyId);
        if (res && (res.ok || res.success)) {
          push('Synced with server', { type: 'success' });
        } else {
          // server returned an error shape
          push(res?.error || 'Server did not confirm shortlist', { type: 'error' });
        }
      } catch (err) {
        // network or server error — keep local and show warning
        push('Could not sync shortlist with server (offline or server error)', { type: 'error', duration: 5000 });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <button onClick={toggle} disabled={busy} className={`px-3 py-2 rounded ${shortlisted ? 'bg-yellow-400' : 'bg-white border'}`}>
      {busy ? '…' : (shortlisted ? 'Shortlisted' : 'Shortlist')}
    </button>
  );
}
