import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminPrivateRoute({ children }) {
  const { isAdmin } = useAdminAuth();
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
} 