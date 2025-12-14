// path: src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

/**
 * AuthContext using authService (axios-based).
 * - on mount calls authService.me()
 * - login/register use authService, then fetch /me to populate user
 * - logout calls authService.logout() and clears user state
 */

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await authService.me();
        if (!mounted) return;
        if (res && res.ok && res.user) setUser(res.user);
        else setUser(null);
      } catch (err) {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  async function login(email, password) {
    try {
      const res = await authService.login(email, password);
      // After login, call me for canonical user
      const me = await authService.me();
      if (me && me.ok && me.user) {
        setUser(me.user);
        return me.user;
      }
      if (res && res.user) {
        setUser(res.user);
        return res.user;
      }
      throw new Error('Login succeeded, but no user returned');
    } catch (err) {
      // normalize error
      if (err?.response?.data) throw err.response.data;
      throw err;
    }
  }

  async function register(payload) {
    try {
      const res = await authService.register(payload);
      // registration may not log in user automatically; attempt fetch me
      try {
        const me = await authService.me();
        if (me && me.ok && me.user) {
          setUser(me.user);
          return me.user;
        }
      } catch (_e) {
        // ignore — registration succeeded but not logged in automatically
      }
      return res;
    } catch (err) {
      if (err?.response?.data) throw err.response.data;
      throw err;
    }
  }

  async function logout() {
    try {
      await authService.logout();
    } catch (e) { /* ignore */ } finally {
      setUser(null);
      navigate('/login');
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
