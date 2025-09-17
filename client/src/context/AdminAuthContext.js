import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in on app start
    const adminToken = localStorage.getItem('adminToken');
    const adminUserData = localStorage.getItem('adminUser');
    
    if (adminToken && adminUserData) {
      try {
        const user = JSON.parse(adminUserData);
        setAdminUser(user);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error parsing admin user data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const adminLogin = React.useCallback(async (email, password) => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success && data.data?.user) {
        if (data.data.user.role !== 'admin') {
          return { success: false, error: 'Admin access required' };
        }
        // Generate avatar from email or initials
        const generateAvatar = (userData) => {
          // If user has a custom profile picture, use it
          if (userData.profilePicture) {
            return userData.profilePicture;
          }
          
          // Generate avatar from name using UI Avatars service
          const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
          if (fullName) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=667eea&color=fff&size=200&bold=true&format=svg`;
          }
          
          // Fallback to initials
          const initials = `${userData.firstName?.charAt(0) || ''}${userData.lastName?.charAt(0) || ''}`.toUpperCase();
          return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=667eea&color=fff&size=200&bold=true&format=svg`;
        };

        const adminData = {
          id: data.data.user._id,
          name: `${data.data.user.firstName} ${data.data.user.lastName}`,
          email: data.data.user.email,
          role: data.data.user.role,
          avatar: generateAvatar(data.data.user),
          lastLogin: data.data.user.lastLogin || new Date().toISOString(),
          loginCount: data.data.user.loginCount || 0,
          createdAt: data.data.user.createdAt,
          isActive: data.data.user.isActive
        };
        
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(adminData));
        
        setAdminUser(adminData);
        setIsAdmin(true);
        
        return { success: true, user: adminData };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }, []);

  const adminLogout = React.useCallback(async () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setIsAdmin(false);
  }, []);

  const getAdminToken = React.useCallback(() => localStorage.getItem('adminToken'), []);

  const updateAdminUser = React.useCallback((newUserData) => {
    const updatedUser = { ...adminUser, ...newUserData };
    setAdminUser(updatedUser);
    localStorage.setItem('adminUser', JSON.stringify(updatedUser));
  }, [adminUser]);

  const refreshAdminUser = React.useCallback(async () => {
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_BASE}/api/auth/profile`, { credentials: 'include' });

      if (response.ok) {
        const data = await response.json();
        
        // Generate avatar from name
        const generateAvatar = (userData) => {
          if (userData.profilePicture) {
            return userData.profilePicture;
          }
          
          const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
          if (fullName) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=667eea&color=fff&size=200&bold=true&format=svg`;
          }
          
          const initials = `${userData.firstName?.charAt(0) || ''}${userData.lastName?.charAt(0) || ''}`.toUpperCase();
          return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=667eea&color=fff&size=200&bold=true&format=svg`;
        };

        const updatedAdminData = {
          id: (data.data?.user || data.user)._id,
          name: `${(data.data?.user || data.user).firstName} ${(data.data?.user || data.user).lastName}`,
          email: (data.data?.user || data.user).email,
          role: (data.data?.user || data.user).role,
          avatar: generateAvatar(data.data?.user || data.user),
          lastLogin: (data.data?.user || data.user).lastLogin,
          loginCount: (data.data?.user || data.user).loginCount,
          createdAt: (data.data?.user || data.user).createdAt,
          isActive: (data.data?.user || data.user).isActive
        };

        setAdminUser(updatedAdminData);
        localStorage.setItem('adminUser', JSON.stringify(updatedAdminData));
      }
    } catch (error) {
      console.error('Error refreshing admin user:', error);
    }
  }, [getAdminToken]);

  const value = {
    isAdmin,
    adminUser,
    loading,
    adminLogin,
    adminLogout,
    getAdminToken,
    updateAdminUser,
    refreshAdminUser
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}; 