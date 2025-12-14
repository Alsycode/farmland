// path: src/config/apiConfig.js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Common prefix your backend uses for routes (from app.js: app.use('/api', routes))
export const API_PREFIX = '/api';

// Convenience: full base URL for Axios/fetch
export const API_URL = `${API_BASE_URL}${API_PREFIX}`;
