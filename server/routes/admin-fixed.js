const express = require('express');
const User = require('../models/User');
const Donation = require('../models/Donation');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Application = require('../models/Application');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const router = express.Router();

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Temporary route to create/fix admin user
router.post('/create-admin', async (req, res) => {
  try {
    console.log('🔍 Checking for admin user...');
    
    // Find admin user by email
    const adminUser = await User.findOne({ email: 'admin@rebirthofaqueen.org' });
    
    if (adminUser) {
      console.log('✅ Found admin user:', adminUser.firstName, adminUser.lastName);
      console.log('🔑 Current role:', adminUser.role);
      
      // Check if role is already admin
      if (adminUser.role === 'admin') {
        return res.json({
          success: true,
          message: 'Admin user already exists with correct role',
          credentials: {
            email: 'admin@rebirthofaqueen.org',
            password: 'admin123'
          }
        });
      } else {
        // Update role to admin
        adminUser.role = 'admin';
        await adminUser.save();
        
        return res.json({
          success: true,
          message: 'Admin role updated successfully',
          credentials: {
            email: 'admin@rebirthofaqueen.org',
            password: 'admin123'
          }
        });
      }
    } else {
      console.log('❌ Admin user not found. Creating new admin user...');
      
      // Create new admin user
      const newAdminUser = new User({
        firstName: 'Rebirth',
        lastName: 'Queen',
        email: 'admin@rebirthofaqueen.org',
        password: 'admin123',
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
        phone: '+254700000000'
      });

      await newAdminUser.save();
      
      return res.json({
        success: true,
        message: 'New admin user created successfully',
        credentials: {
          email: 'admin@rebirthofaqueen.org',
          password: 'admin123'
        }
      });
    }
    
  } catch (error) {
    console.error('❌ Error creating/fixing admin user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin user',
      error: error.message
    });
  }
});

// Get admin user info
router.get('/admin-info', async (req, res) => {
  try {
    const adminUser = await User.findOne({ email: 'admin@rebirthofaqueen.org' });
    
    if (adminUser) {
      res.json({
        success: true,
        admin: {
          name: `${adminUser.firstName} ${adminUser.lastName}`,
          email: adminUser.email,
          role: adminUser.role,
          isActive: adminUser.isActive,
          isEmailVerified: adminUser.isEmailVerified
        }
      });
    } else {
      res.json({
        success: false,
        message: 'Admin user not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin info',
      error: error.message
    });
  }
});

// Get dashboard data
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    // Get basic stats
    const [
      totalUsers,
      totalDonations,
      totalProducts,
      totalOrders,
      recentUsers,
      recentDonations,
      donationStats
    ] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName email createdAt isActive isEmailVerified'),
      Donation.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName amount paymentStatus createdAt'),
      Donation.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
            completedDonations: {
              $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] }
            },
            pendingDonations: {
              $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, 1, 0] }
            }
          }
        }
      ])
    ]);

    // Get user stats
    const userStats = await User.aggregate([
      {
        $group: {
          _id: null,
          activeUsers: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
          },
          verifiedUsers: {
            $sum: { $cond: [{ $eq: ['$isEmailVerified', true] }, 1, 0] }
          }
        }
      }
    ]);

    // Get monthly data for charts (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await User.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthlyDonations = await Donation.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          amount: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const dashboardData = {
      totalUsers,
      totalDonations,
      totalProducts,
      totalOrders,
      recentUsers,
      recentDonations,
      donationStats: donationStats[0] || { totalAmount: 0, completedDonations: 0, pendingDonations: 0 },
      userStats: userStats[0] || { activeUsers: 0, verifiedUsers: 0 },
      monthlyUsers,
      monthlyDonations
    };

    res.json(dashboardData);

  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sidebar data with real-time counts and badges
router.get('/sidebar-data', requireAdmin, async (req, res) => {
  try {
    // Get real-time counts for sidebar badges
    const [
      totalUsers,
      pendingDonations,
      totalDonations,
      newUsersToday,
      newDonationsToday,
      pendingApplications,
      totalProducts,
      totalOrders,
      unreadNotifications
    ] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments({ paymentStatus: 'pending' }),
      Donation.countDocuments(),
      User.countDocuments({ 
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } 
      }),
      Donation.countDocuments({ 
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } 
      }),
      // Placeholder for applications - replace with actual model when available
      Promise.resolve(0),
      // Get actual product count
      Product.countDocuments(),
      // Get actual order count
      Order.countDocuments(),
      // Placeholder for notifications - replace with actual model when available
      Promise.resolve(0)
    ]);

    // Build sidebar menu structure with real data
    const sidebarData = {
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
              badge: newUsersToday > 0 ? `${newUsersToday} new` : null 
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
              badge: totalUsers > 0 ? totalUsers.toString() : null 
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
              badge: pendingApplications > 0 ? pendingApplications.toString() : null 
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
              badge: totalProducts > 0 ? totalProducts.toString() : null 
            },
            { 
              label: 'Orders', 
              icon: 'FaShoppingCart', 
              to: '/admin/orders', 
              badge: totalOrders > 0 ? totalOrders.toString() : null 
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
              badge: totalDonations > 0 ? totalDonations.toString() : null 
            },
            { 
              label: 'Payments', 
              icon: 'FaCreditCard', 
              to: '/admin/payments', 
              badge: pendingDonations > 0 ? `${pendingDonations} pending` : null 
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
        totalUsers,
        pendingDonations,
        totalDonations,
        newUsersToday,
        newDonationsToday,
        pendingApplications,
        totalProducts,
        totalOrders,
        unreadNotifications
      }
    };

    res.json(sidebarData);

  } catch (error) {
    console.error('Get sidebar data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get analytics data
router.get('/analytics', requireAdmin, async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get analytics data
    const [
      totalUsers,
      newUsers,
      totalDonations,
      newDonations,
      totalOrders,
      newOrders,
      totalRevenue,
      recentActivity
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: startDate } }),
      Donation.countDocuments(),
      Donation.countDocuments({ createdAt: { $gte: startDate } }),
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: startDate } }),
      // Calculate total revenue from completed donations
      Donation.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      // Get recent activity
      Promise.all([
        User.find().sort({ createdAt: -1 }).limit(3).select('firstName lastName email createdAt'),
        Donation.find().sort({ createdAt: -1 }).limit(3).select('firstName lastName amount paymentStatus createdAt')
      ])
    ]);

    // Process recent activity
    const processedActivity = [];
    
    // Add recent users
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(3).select('firstName lastName email createdAt');
    recentUsers.forEach(user => {
      processedActivity.push({
        type: 'user',
        title: `New user registered: ${user.firstName} ${user.lastName}`,
        time: user.createdAt.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      });
    });

    // Add recent donations
    const recentDonations = await Donation.find().sort({ createdAt: -1 }).limit(3).select('firstName lastName amount paymentStatus createdAt');
    recentDonations.forEach(donation => {
      processedActivity.push({
        type: 'donation',
        title: `New donation: ${donation.firstName} ${donation.lastName} - ${donation.amount} KES`,
        time: donation.createdAt.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      });
    });

    // Sort by creation date
    processedActivity.sort((a, b) => new Date(b.time) - new Date(a.time));

    const analyticsData = {
      totalUsers,
      newUsers,
      totalDonations,
      newDonations,
      totalOrders,
      newOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      revenueGrowth: 15, // Placeholder - calculate actual growth
      recentActivity: processedActivity.slice(0, 5)
    };

    res.json(analyticsData);

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reports data
router.get('/reports', requireAdmin, async (req, res) => {
  try {
    const { type = 'overview', period = '30' } = req.query;
    const startDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000);

    let report = {};

    switch (type) {
      case 'overview':
        // Get overview statistics
        const [userStats, donationStats] = await Promise.all([
          User.aggregate([
            {
              $match: { createdAt: { $gte: startDate } }
            },
            {
              $group: {
                _id: null,
                newUsers: { $sum: 1 },
                activeUsers: { $sum: { $cond: [{ $gt: ['$loginCount', 0] }, 1, 0] } },
                verifiedUsers: { $sum: { $cond: ['$isEmailVerified', 1, 0] } }
              }
            }
          ]),
          Donation.aggregate([
            {
              $match: { createdAt: { $gte: startDate } }
            },
            {
              $group: {
                _id: null,
                totalDonations: { $sum: 1 },
                totalAmount: { $sum: '$amount' },
                completedDonations: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] } },
                completedAmount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, '$amount', 0] } }
              }
            }
          ])
        ]);

        report = {
          period: `${period} days`,
          users: userStats[0] || { newUsers: 0, activeUsers: 0, verifiedUsers: 0 },
          donations: donationStats[0] || { totalDonations: 0, totalAmount: 0, completedDonations: 0, completedAmount: 0 }
        };
        break;

      case 'user-growth':
        // Get user growth over time
        const userGrowth = await User.aggregate([
          {
            $match: { createdAt: { $gte: startDate } }
          },
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' },
                day: { $dayOfMonth: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          {
            $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
          }
        ]);

        report = { userGrowth };
        break;

      case 'donation-trends':
        // Get donation trends over time
        const donationTrends = await Donation.aggregate([
          {
            $match: { createdAt: { $gte: startDate } }
          },
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' },
                day: { $dayOfMonth: '$createdAt' }
              },
              count: { $sum: 1 },
              amount: { $sum: '$amount' }
            }
          },
          {
            $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
          }
        ]);

        report = { donationTrends };
        break;

      default:
        return res.status(400).json({ message: 'Invalid report type' });
    }

    res.json({ report });

  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users with pagination
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const status = req.query.status || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    // Get users
    const users = await User.find(query)
      .select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all donations with pagination and filtering
router.get('/donations', requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const paymentMethod = req.query.paymentMethod || '';
    const startDate = req.query.startDate || '';
    const endDate = req.query.endDate || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.paymentStatus = status;
    }

    if (paymentMethod) {
      query.paymentMethod = paymentMethod;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Get donations
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await Donation.countDocuments(query);

    // Get summary statistics
    const summary = await Donation.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
          completedAmount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, '$amount', 0] } },
          completedCount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] } },
          pendingAmount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, '$amount', 0] } },
          pendingCount: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, 1, 0] } }
        }
      }
    ]);

    res.json({
      donations,
      summary: summary[0] || {
        totalAmount: 0,
        totalCount: 0,
        completedAmount: 0,
        completedCount: 0,
        pendingAmount: 0,
        pendingCount: 0
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
