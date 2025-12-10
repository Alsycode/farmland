// frontend/src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      background: 'linear-gradient(180deg, var(--brand-primary), rgba(14,64,37,0.9))',
      color: 'black',
      padding: '1.25rem',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 18 }}>Farmland Admin</div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <NavLink to="/" style={({isActive})=>navStyle(isActive)}>Dashboard</NavLink>
        <NavLink to="/listings" style={({isActive})=>navStyle(isActive)}>Listings</NavLink>
        <NavLink to="/bookings" style={({isActive})=>navStyle(isActive)}>Bookings</NavLink>
        <NavLink to="/favorites" style={({isActive})=>navStyle(isActive)}>Favorites</NavLink>
        <NavLink to="/messages" style={({isActive})=>navStyle(isActive)}>Messages</NavLink>
        <a href="/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', padding: '8px 10px', borderRadius: 8 }}>API Docs</a>
      </nav>

      <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
        <small>© {new Date().getFullYear()} Farmland</small>
      </div>
    </aside>
  );
}

function navStyle(active) {
  return {
    display: 'block',
    padding: '8px 10px',
    borderRadius: 8,
    color: active ? 'var(--brand-primary)' : 'white',
    background: active ? 'var(--card-bg)' : 'transparent',
    textDecoration: 'none',
    fontWeight: 600
  };
}
