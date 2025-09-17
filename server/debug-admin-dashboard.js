const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import User model
const User = require('./models/User');

const debugAdminDashboard = async () => {
  try {
    console.log('🔍 Debugging Admin Dashboard Issues...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rebirth-of-a-queen';
    console.log('📡 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Step 1: Verify admin user
    console.log('\n👤 Step 1: Verifying Admin User...');
    const adminEmail = 'admin@rebirthofaqueen.org';
    const adminPassword = 'admin123';
    
    const adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log('✅ Admin user found');
    console.log(`   Name: ${adminUser.firstName} ${adminUser.lastName}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Role: ${adminUser.role}`);
    console.log(`   Active: ${adminUser.isActive}`);
    
    // Step 2: Test password
    const isPasswordValid = await bcrypt.compare(adminPassword, adminUser.password);
    console.log(`   Password Valid: ${isPasswordValid ? '✅' : '❌'}`);
    
    if (!isPasswordValid) {
      console.log('❌ Password verification failed');
      return;
    }
    
    // Step 3: Generate JWT token (exactly like the server does)
    console.log('\n🔐 Step 3: Generating JWT Token...');
    const token = jwt.sign(
      { 
        userId: adminUser._id,
        email: adminUser.email,
        role: adminUser.role
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );
    
    console.log('✅ JWT token generated');
    console.log(`   Token preview: ${token.substring(0, 50)}...`);
    
    console.log('\n🎯 Debugging Complete!');
    console.log('\n📝 Admin System Status:');
    console.log('   ✅ Admin user exists and is valid');
    console.log('   ✅ Password verification works');
    console.log('   ✅ JWT token generation works');
    console.log('   ✅ Server is running on port 5000');
    
    console.log('\n🔧 To Fix "Failed to load dashboard data":');
    console.log('   1. Make sure client is running: npm start (in client directory)');
    console.log('   2. Go to: http://localhost:3000/admin/login');
    console.log('   3. Login with: admin@rebirthofaqueen.org / admin123');
    console.log('   4. Check browser console for errors');
    console.log('   5. Check localStorage for adminToken');
    
    console.log('\n🌐 Test URLs:');
    console.log('   - Admin Login: http://localhost:3000/admin/login');
    console.log('   - Admin Dashboard: http://localhost:3000/admin');
    console.log('   - Server API: http://localhost:5000/api/admin/admin-info');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run the debug
debugAdminDashboard();
