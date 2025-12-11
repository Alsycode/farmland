// path: src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">404</h2>
        <p className="mb-4">Page not found</p>
        <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded">Go home</Link>
      </div>
    </div>
  );
}
