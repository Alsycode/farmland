// path: src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import api from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

/**
 * AuthContext (updated)
 * - Uses apiClient + authService
 * - On mount calls authService.me() to populate user
 * - login uses authService.login() (which sets cookies) and then authService.me()
 * - logout calls authService.logout() and clears local state
 *
 * Note: all requests use withCredentials so cookies are sent.
 */

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user object from /auth/me
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const json = await authService.me();
        if (json && json.ok && json.user && mounted) {
          setUser(json.user);
        } else if (mounted) {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function login(email, password) {
    try {
      const data = await authService.login(email, password);
      // some backends return accessToken and user; we rely on /auth/me for canonical user
      const me = await authService.me();
      if (me && me.ok && me.user) {
        setUser(me.user);
        return me.user;
      }
      // fallback: if login returned user
      if (data && data.user) {
        setUser(data.user);
        return data.user;
      }
      throw new Error('Login succeeded but no user info returned');
    } catch (err) {
      // Normalize error shape
      if (err.response && err.response.data) throw err.response.data;
      throw err;
    }
  }

  async function logout() {
    try {
      await authService.logout();
    } catch (err) {
      // ignore
    } finally {
      setUser(null);
      // redirect to login
      navigate('/login');
    }
  }

  const value = {
    user,
    loading,
    setUser,
    login,
    logout,
    api // expose api client for convenience (optional)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
