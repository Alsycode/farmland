// frontend/src/api.js
/**
 * Purpose: Axios client for the frontend to talk to backend APIs.
 * - Stores accessToken in localStorage under key 'accessToken'
 * - Attaches Authorization header automatically if accessToken present.
 * - Provides simple wrapper for login to store token.
 *
 * TODO: Add refresh token automatic rotation using refresh cookie when access token expires.
 */
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

const client = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // allow cookies (refresh token)
  headers: {
    'Content-Type': 'application/json'
  }
});

// attach access token if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

// basic response interceptor to detect 401 and optionally try refresh
client.interceptors.response.use((res) => res, async (err) => {
  const original = err.config;
  if (err.response && err.response.status === 401 && !original._retry) {
    original._retry = true;
    try {
      // attempt refresh token exchange using cookie
      const r = await client.post('/auth/refresh');
      if (r.data && r.data.accessToken) {
        localStorage.setItem('accessToken', r.data.accessToken);
        original.headers['Authorization'] = `Bearer ${r.data.accessToken}`;
        return client(original);
      }
    } catch (refreshErr) {
      // fallthrough to reject
    }
  }
  return Promise.reject(err);
});

export async function login(email, password) {
  const res = await client.post('/auth/login', { email, password });
  if (res.data && res.data.accessToken) {
    localStorage.setItem('accessToken', res.data.accessToken);
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem('accessToken');
  return client.post('/auth/logout');
}

export default client;
