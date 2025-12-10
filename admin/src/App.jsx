// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import ListingsTable from './pages/ListingsTable';
import BookingsPage from './pages/BookingsPage';
import FavoritesPage from './pages/FavoritesPage';
import MessagesPage from './pages/MessagesPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './styles/theme.css';
import './index.css';

function RequireAuth({ children }) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
        <Sidebar />
        <div style={{ marginLeft: 'var(--sidebar-width)', flex: 1 }}>
          <Topbar />
          <main style={{ padding: '1.25rem' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RequireAuth><DashboardHome /></RequireAuth>} />
              <Route path="/listings" element={<RequireAuth><ListingsTable /></RequireAuth>} />
              <Route path="/bookings" element={<RequireAuth><BookingsPage /></RequireAuth>} />
              <Route path="/favorites" element={<RequireAuth><FavoritesPage /></RequireAuth>} />
              <Route path="/messages" element={<RequireAuth><MessagesPage /></RequireAuth>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
