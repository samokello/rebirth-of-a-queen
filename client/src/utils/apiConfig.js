/**
 * Centralized API Configuration
 * 
 * This utility provides a consistent way to access the API base URL
 * across the entire application. It ensures all API calls use the
 * correct backend URL from environment variables.
 */

// Get the API base URL from environment variable
// Remove trailing slash if present
const getApiBaseUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://rebirth-of-a-queen.onrender.com';
  return apiUrl.replace(/\/$/, ''); // Remove trailing slash
};

// Get the full API URL (base + /api)
export const getApiUrl = () => {
  return `${getApiBaseUrl()}/api`;
};

// Get the base URL without /api
export const getBaseUrl = () => {
  return getApiBaseUrl();
};

// Helper function to build full API endpoint URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${getApiUrl()}/${cleanEndpoint}`;
};

// Helper function for fetch calls with authentication
export const apiFetch = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };
  
  return fetch(url, config);
};

// Export the base URL for direct use
export const API_BASE_URL = getApiBaseUrl();
export const API_URL = getApiUrl();

const apiConfig = {
  getApiUrl,
  getBaseUrl,
  buildApiUrl,
  apiFetch,
  API_BASE_URL,
  API_URL,
};

export default apiConfig;

