import React from 'react';
import Layout from './Layout';
import NetworkStatus from './components/NetworkStatus';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <Layout>
      <NetworkStatus />
      <Outlet />
    </Layout>
  );
} 