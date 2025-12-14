// path: src/services/authService.js
import api from './apiClient';

/**
 * authService - wrappers around backend auth endpoints.
 *
 * Expected backend routes:
 * POST  /api/auth/login     -> sets httpOnly cookies, may return { ok, user }
 * POST  /api/auth/logout
 * GET   /api/auth/me        -> returns { ok, user }
 * POST  /api/auth/refresh   -> uses cookies to refresh tokens
 * POST  /api/auth/register  -> register user (may be disabled on some backends)
 */

async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
}

async function logout() {
  const res = await api.post('/auth/logout');
  return res.data;
}

async function me() {
  const res = await api.get('/auth/me');
  return res.data;
}

async function refresh() {
  const res = await api.post('/auth/refresh');
  return res.data;
}

async function register(payload) {
  const res = await api.post('/auth/register', payload);
  return res.data;
}

export default {
  login,
  logout,
  me,
  refresh,
  register
};
