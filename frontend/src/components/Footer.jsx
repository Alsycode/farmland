// path: src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
        <div>
          <h4 className="font-semibold mb-2">Farmland</h4>
          <p>Find, shortlist and schedule visits to farmland properties across regions.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Links</h4>
          <div className="flex flex-col gap-1">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/blogs">Blogs</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <div>email@farmland.example</div>
          <div>+91 98765 43210</div>
        </div>
      </div>
    </footer>
  );
}
