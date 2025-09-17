// src/api.js
import axios from 'axios';

// Simple API configuration
const API = axios.create({
  baseURL: 'http://localhost:5000/api/users',
  timeout: 15000, // 15 second timeout
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Main API instance for general backend endpoints
export const API_MAIN = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 15000, // 15 second timeout
});

// Add authentication interceptor to API_MAIN
API_MAIN.interceptors.request.use((config) => {
  // Check for admin token first, then user token
  const adminToken = localStorage.getItem('adminToken');
  const userToken = localStorage.getItem('token');
  
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  
  return config;
});

// Add response interceptor to handle authentication errors
API_MAIN.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('API_MAIN response interceptor - Error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('API_MAIN response interceptor - Authentication error detected');
      // Don't automatically logout here, let the component handle it
    }
    return Promise.reject(error);
  }
);

export default API;
