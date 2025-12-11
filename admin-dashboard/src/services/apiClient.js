// path: src/services/apiClient.js
import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import authService from './authService';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // send cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Response interceptor to handle 401 -> try refresh once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // avoid re-entrancy
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // attempt refresh; authService will call /auth/refresh which uses cookies
        await authService.refresh();
        // retry original request
        return api(originalRequest);
      } catch (refreshErr) {
        // refresh failed -> logout client-side
        try {
          await authService.logout(); // best-effort
        } catch (e) {
          // ignore
        }
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
