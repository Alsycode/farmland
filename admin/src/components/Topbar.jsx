// frontend/src/components/Topbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';

export default function Topbar() {
  const navigate = useNavigate();
  async function doLogout() {
    try {
      await logout();
    } catch(e) {}
    localStorage.removeItem('accessToken');
    navigate('/login');
  }
  return (
    <header style={{
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      background: 'transparent',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} title="Toggle sidebar">☰</button>
        <div style={{ fontWeight: 700, color: 'var(--text)' }}>Admin Dashboard</div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--brand-secondary)' }} onClick={() => window.location.reload()}>Refresh</button>
        <button onClick={doLogout} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)', background: 'transparent' }}>Logout</button>
      </div>
    </header>
  );
}
