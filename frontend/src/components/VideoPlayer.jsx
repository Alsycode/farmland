// path: src/components/VideoPlayer.jsx
import React from 'react';

/**
 * VideoPlayer - simple wrapper providing poster + controls and full-screen toggle via browser controls.
 * Props: src, poster
 */
export default function VideoPlayer({ src, poster }) {
  return (
    <video controls poster={poster} className="w-full h-full object-contain" playsInline>
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
}
