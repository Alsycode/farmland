// path: src/components/LoadingSpinner.jsx
import React from 'react';

export default function LoadingSpinner({ size = 6 }) {
  const s = `${size}rem`;
  return (
    <div className="flex items-center justify-center">
      <svg style={{ width: s, height: s }} className="animate-spin text-gray-400" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>
  );
}
