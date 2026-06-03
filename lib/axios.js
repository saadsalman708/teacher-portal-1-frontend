import axios from 'axios';

const api = axios.create({
  // Use your backend URL from env, or default to localhost
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  // Include this if your backend uses HTTP-only cookies for the token
  withCredentials: true, 
});

// Interceptor to automatically attach the token if you are using localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;