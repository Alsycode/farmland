// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#eef4ee]">
      <Navbar />
      {/* Remove container + padding here; let child pages control layout */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
