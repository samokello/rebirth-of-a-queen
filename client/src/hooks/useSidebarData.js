import { useState, useEffect } from 'react';
import { API_MAIN } from '../api';
import { mockSidebarData } from '../utils/mockSidebarData';

export const useSidebarData = () => {
  const [sidebarData, setSidebarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSidebarData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API_MAIN.get('/admin/sidebar-data');
      setSidebarData(response.data);
          } catch (error) {
        console.error('Error fetching sidebar data:', error);
        setError(error.message);
        // Fallback to mock data if API fails
        setSidebarData(mockSidebarData);
      } finally {
        setLoading(false);
      }
  };

  // Initial fetch
  useEffect(() => {
    fetchSidebarData();
  }, []);

  // Refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSidebarData();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    sidebarData,
    loading,
    error,
    refreshData: fetchSidebarData
  };
}; 