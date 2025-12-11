// path: src/components/RoleGuard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * RoleGuard will render children only if user.role is one of allowed roles.
 * roles prop can be string or array of strings.
 * Example: <RoleGuard roles={['admin','manager']}>...</RoleGuard>
 */
export default function RoleGuard({ roles, children, fallback = null }) {
  const { user, loading } = useAuth();

  if (loading) return null; // hide while loading (could show spinner)

  if (!user) return fallback;

  const allowed = Array.isArray(roles) ? roles : [roles];
  if (allowed.includes(user.role)) return children;

  return fallback;
}
