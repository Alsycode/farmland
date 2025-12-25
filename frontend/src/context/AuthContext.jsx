import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ===== HYDRATE USER ON REFRESH ===== */
  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const res = await authService.me();
        if (mounted && res?.ok && res.user) {
          setUser(res.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadUser();
    return () => { mounted = false; };
  }, []);

  /* ===== LOGIN ===== */
  async function login(email, password) {
    const res = await authService.login(email, password);

    if (res?.user) {
      setUser(res.user);
      return res.user;
    }

    throw new Error('Login failed');
  }

  /* ===== LOGOUT ===== */
  function logout() {
    authService.logout();
    setUser(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
