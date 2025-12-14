// path: src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-4xl font-bold mb-2">404</h2>
      <p className="text-gray-600 mb-4">Page not found</p>
      <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded">Go home</Link>
    </div>
  );
}
