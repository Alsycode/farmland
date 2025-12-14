// path: src/components/PDFDownloadButton.jsx
import React, { useState } from 'react';
import { API_BASE_URL } from '../config/apiConfig';
import { useToasts } from '../context/ToastContext';
import api from '../services/apiClient';

/**
 * PDFDownloadButton:
 * - Accepts pdfUrl (could be absolute or relative).
 * - If relative, resolves with API_BASE_URL + pdfUrl.
 * - Attempts HEAD request to verify and then downloads via a hidden link to preserve cookies if needed.
 * - Shows simple toast feedback.
 */
export default function PDFDownloadButton({ pdfUrl, label = 'Download PDF' }) {
  const [loading, setLoading] = useState(false);
  const { push } = useToasts();

  if (!pdfUrl) return null;

  const absolute = pdfUrl.startsWith('http') ? pdfUrl : `${API_BASE_URL}${pdfUrl}`;

  async function handle() {
    setLoading(true);
    try {
      // optional HEAD to confirm existence
      await api.head(absolute).catch(() => null);
      // trigger download
      const a = document.createElement('a');
      a.href = absolute;
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.click();
      push('Download started', { type: 'success' });
    } catch (err) {
      push('Failed to start download', { type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handle} disabled={loading} className="px-3 py-2 bg-indigo-600 text-white rounded">
      {loading ? 'Preparing…' : label}
    </button>
  );
}
