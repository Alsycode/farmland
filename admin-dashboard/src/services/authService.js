import api from './apiClient';

/**
 * authService:
 * - login(email, password): POST /auth/login (server sets httpOnly refresh/access cookies)
 * - logout(): POST /auth/logout
 * - me(): GET /auth/me
 * - refresh(): POST /auth/refresh (used by interceptor)
 *
 * All calls use api (withCredentials true).
 */

async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  // server returns { ok, accessToken?, user }
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

export default {
  login,
  logout,
  me,
  refresh
};