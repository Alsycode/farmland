// path: src/services/apiClient.js
import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import authService from './authService';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 15000
});

// 401 interceptor -> try refresh once
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (!original) return Promise.reject(err);

    if (err.response && err.response.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await authService.refresh(); // calls POST /auth/refresh (uses cookies)
        return api(original);
      } catch (refreshErr) {
        // refresh failed; ensure client state cleared
        try {
          await authService.logout(); // best-effort
        } catch (e) { /* ignore */ }
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
