const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const donationRoutes = require('./routes/donations');
const mpesaRoutes = require('./routes/mpesa');
const paypalRoutes = require('./routes/paypal');
const smsRoutes = require('./routes/sms');
const shopRoutes = require('./routes/shop');
const paymentRoutes = require('./routes/payments');
const newsletterRoutes = require('./routes/newsletter');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const applicationRoutes = require('./routes/applications');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');
const User = require('./models/User');
const { authenticateToken } = require('./middleware/auth');

const app = express();

// Connect to Database
connectDB();

// Basic middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Public route to create/fix admin user (no authentication required)
app.post('/api/setup-admin', async (req, res) => {
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

// Routes
app.use('/api/donations', donationRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Health Check Route with DB status
app.get('/api/health', (req, res) => {
  const dbStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  const dbState = dbStateMap[require('mongoose').connection.readyState] || 'unknown';
  res.status(200).json({ 
    status: 'OK', 
    message: 'Rebirth of a Queen API is running',
    timestamp: new Date().toISOString(),
    db: {
      state: dbState
    }
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString()
  });
});

// Mock donation route for testing
app.post('/api/donations', (req, res) => {
  try {
    console.log('Donation request received:', req.body);
    res.json({
      success: true,
      message: 'Donation created successfully',
      data: {
        donationId: 'test_donation_' + Date.now(),
        amount: req.body.amount || 10,
        paymentMethod: req.body.paymentMethod || 'test',
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Donation endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create donation',
      error: error.message
    });
  }
});

// Mock M-Pesa route for testing
app.post('/api/mpesa/stk-push', (req, res) => {
  try {
    console.log('M-Pesa STK Push request received:', req.body);
    res.json({
      success: true,
      message: 'M-Pesa STK Push initiated successfully',
      data: {
        checkoutRequestId: 'test_checkout_' + Date.now(),
        merchantRequestId: 'test_merchant_' + Date.now(),
        customerMessage: 'Check your phone for payment prompt',
        responseDescription: 'Success. Request accepted for processing'
      }
    });
  } catch (error) {
    console.error('M-Pesa STK Push endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate M-Pesa payment',
      error: error.message
    });
  }
});

// Mock PayPal route for testing
app.post('/api/paypal/create-order', (req, res) => {
  res.json({
    success: true,
    message: 'PayPal order created successfully',
    data: {
      orderId: 'test_order_' + Date.now(),
      status: 'CREATED',
      links: []
    }
  });
});

// Mock M-Pesa check status route for testing
app.post('/api/mpesa/check-status', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'pending',
      resultCode: 0,
      resultDesc: 'The service request is processed successfully'
    }
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 Handler
app.use('/*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
}); 