// Mock sidebar data for testing when backend is not available
export const mockSidebarData = {
  menuItems: [
    {
      title: 'Main',
      icon: 'FaRocket',
      items: [
        { 
          label: 'Dashboard', 
          icon: 'FaTachometerAlt', 
          to: '/admin', 
          badge: null 
        },
        { 
          label: 'Analytics', 
          icon: 'FaChartBar', 
          to: '/admin/analytics', 
          badge: '3 new' 
        },
        { 
          label: 'Reports', 
          icon: 'FaFileAlt', 
          to: '/admin/reports', 
          badge: null 
        }
      ]
    },
    {
      title: 'User Management',
      icon: 'FaUsers',
      items: [
        { 
          label: 'Users', 
          icon: 'FaUsers', 
          to: '/admin/users', 
          badge: '25' 
        },
        { 
          label: 'Roles & Permissions', 
          icon: 'FaShieldAlt', 
          to: '/admin/roles', 
          badge: null 
        },
        { 
          label: 'User Profiles', 
          icon: 'FaUser', 
          to: '/admin/profiles', 
          badge: null 
        }
      ]
    },
    {
      title: 'Content & Programs',
      icon: 'FaGraduationCap',
      items: [
        { 
          label: 'Programs', 
          icon: 'FaGraduationCap', 
          to: '/admin/programs', 
          badge: null 
        },
        { 
          label: 'Applications', 
          icon: 'FaFileAlt', 
          to: '/admin/applications', 
          badge: '5' 
        },
        { 
          label: 'Content Management', 
          icon: 'FaEdit', 
          to: '/admin/content', 
          badge: null 
        }
      ]
    },
    {
      title: 'E-commerce',
      icon: 'FaShoppingCart',
      items: [
        { 
          label: 'Products', 
          icon: 'FaBox', 
          to: '/admin/products', 
          badge: '12' 
        },
        { 
          label: 'Orders', 
          icon: 'FaShoppingCart', 
          to: '/admin/orders', 
          badge: '8' 
        },
        { 
          label: 'Inventory', 
          icon: 'FaDatabase', 
          to: '/admin/inventory', 
          badge: null 
        }
      ]
    },
    {
      title: 'Financial',
      icon: 'FaDonate',
      items: [
        { 
          label: 'Donations', 
          icon: 'FaDonate', 
          to: '/admin/donations', 
          badge: '15' 
        },
        { 
          label: 'Payments', 
          icon: 'FaCreditCard', 
          to: '/admin/payments', 
          badge: '3 pending' 
        },
        { 
          label: 'Financial Reports', 
          icon: 'FaChartBar', 
          to: '/admin/financials', 
          badge: null 
        }
      ]
    },
    {
      title: 'Communication',
      icon: 'FaBell',
      items: [
        { 
          label: 'Announcements', 
          icon: 'FaBell', 
          to: '/admin/announcements', 
          badge: null 
        },
        { 
          label: 'Bulk SMS', 
          icon: 'FaSms', 
          to: '/admin/bulk-sms', 
          badge: null 
        },
        { 
          label: 'Email Campaigns', 
          icon: 'FaEnvelope', 
          to: '/admin/emails', 
          badge: null 
        }
      ]
    },
    {
      title: 'System',
      icon: 'FaCog',
      items: [
        { 
          label: 'Settings', 
          icon: 'FaCog', 
          to: '/admin/settings', 
          badge: null 
        },
        { 
          label: 'Security', 
          icon: 'FaShieldAlt', 
          to: '/admin/security', 
          badge: null 
        },
        { 
          label: 'System Logs', 
          icon: 'FaHistory', 
          to: '/admin/logs', 
          badge: null 
        }
      ]
    }
  ],
  stats: {
    totalUsers: 25,
    pendingDonations: 3,
    totalDonations: 15,
    newUsersToday: 3,
    newDonationsToday: 2,
    pendingApplications: 5,
    totalProducts: 12,
    totalOrders: 8,
    unreadNotifications: 2
  }
}; 