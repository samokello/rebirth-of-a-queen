// src/utils/api.js

const API_URL = process.env.REACT_APP_API_URL || 'https://www.rebirthofaqueen.org/';

// Helper function to handle API requests
async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
      },
      ...options
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

export async function registerUser(userData) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
}

export async function loginUser(credentials) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
}

export async function getProfile(token) {
  return apiRequest('/auth/profile', {
    method: 'GET',
    token
  });
}

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/shop/products?${query}`);
}

export async function getProductById(id) {
  return apiRequest(`/shop/products/${id}`);
}

export async function getProductBySlug(slug) {
  return apiRequest(`/shop/products/slug/${slug}`);
}

export async function createOrder(orderData, token) {
  return apiRequest('/shop/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
    token
  });
}

export async function getOrders(token, params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/shop/orders?${query}`, {
    method: 'GET',
    token
  });
}

export async function cancelOrder(orderId, token) {
  return apiRequest(`/shop/orders/${orderId}/cancel`, {
    method: 'PUT',
    token
  });
}
