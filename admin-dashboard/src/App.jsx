// path: src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import PropertyForm from './pages/PropertyForm';
import Bookings from './pages/Bookings';
import Favorites from './pages/Favorites';
import Messages from './pages/Messages';
import Users from './pages/User';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';

import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';

/**
 * Protect all routes under Layout with ProtectedRoute.
 * Use RoleGuard where role-specific access is required.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/new" element={
          <RoleGuard roles={['manager','admin']} fallback={<Navigate to="/dashboard" replace />}>
            <PropertyForm />
          </RoleGuard>
        } />
        <Route path="properties/:id" element={<PropertyDetail />} />
        <Route path="properties/:id/edit" element={
          <RoleGuard roles={['manager','admin']} fallback={<Navigate to="/dashboard" replace />}>
            <PropertyForm />
          </RoleGuard>
        } />
        <Route path="bookings" element={<Bookings />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="messages" element={<Messages />} />
        <Route path="admin/users" element={
          <RoleGuard roles={'admin'} fallback={<Navigate to="/dashboard" replace />}>
            <Users />
          </RoleGuard>
        } />
        <Route path="analytics" element={
          <RoleGuard roles={['manager','admin']} fallback={<Navigate to="/dashboard" replace />}>
            <Analytics />
          </RoleGuard>
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
