// path: src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Protects routes for authenticated users.
 * If loading, show simple message; else redirect to /login.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center p-8">Checking authentication…</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
