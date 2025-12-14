// path: src/components/ImageGallery.jsx
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

/**
 * Enhanced ImageGallery with fullscreen modal.
 * Accepts media array: { type: 'image'|'video', url, thumbnail }
 */
export default function ImageGallery({ media = [] }) {
  const [idx, setIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const item = media[idx];

  if (!media.length) {
    return <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">No images/videos</div>;
  }

  function openFull() {
    setFullscreen(true);
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="w-full h-80 bg-black/5 flex items-center justify-center overflow-hidden rounded">
          {item.type === 'video' ? (
            <VideoPlayer src={item.url} poster={item.thumbnail} />
          ) : (
            <img src={item.url} alt={item.filename || `media-${idx}`} className="w-full h-full object-cover" onClick={openFull} style={{ cursor: 'zoom-in' }} />
          )}
        </div>

        <button onClick={() => setIdx((i) => (i - 1 + media.length) % media.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2">◀</button>
        <button onClick={() => setIdx((i) => (i + 1) % media.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2">▶</button>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {media.map((m, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-20 h-14 rounded overflow-hidden border ${i === idx ? 'ring-2 ring-indigo-600' : ''}`}>
            {m.type === 'video' ? (
              <video className="w-full h-full object-cover">
                <source src={m.url} />
              </video>
            ) : (
              <img src={m.thumbnail || m.url} alt="" className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>

      {/* fullscreen modal */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-full max-h-[90vh]">
            <button onClick={() => setFullscreen(false)} className="absolute right-2 top-2 text-white z-50 bg-black/40 rounded px-3 py-1">Close</button>
            <div className="w-full h-full bg-black flex items-center justify-center">
              {item.type === 'video' ? (
                <video controls className="max-w-full max-h-full"><source src={item.url} /></video>
              ) : (
                <img src={item.url} alt="" className="max-w-full max-h-full object-contain" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
