// path: src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="container flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">Farmland</Link>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/search" className="text-sm text-gray-700">Search</Link>
            <Link to="/explore" className="text-sm text-gray-700">Explore Map</Link>
            <Link to="/blogs" className="text-sm text-gray-700">Blogs</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm text-gray-700 mr-3">Dashboard</Link>
                <button onClick={logout} className="text-sm px-3 py-1 bg-red-500 text-white rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm px-3 py-1 bg-indigo-600 text-white rounded">Login</Link>
                <Link to="/register" className="text-sm text-gray-700 ml-2">Register</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link to="/search" onClick={() => setOpen(false)} className="text-gray-700">Search</Link>
            <Link to="/explore" onClick={() => setOpen(false)} className="text-gray-700">Explore Map</Link>
            <Link to="/blogs" onClick={() => setOpen(false)} className="text-gray-700">Blogs</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="text-gray-700">Dashboard</Link>
                <button onClick={() => { logout(); setOpen(false); }} className="text-left text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-gray-700">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="text-gray-700">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
