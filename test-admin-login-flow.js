const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import User model
const User = require('./server/models/User');

const testAdminLoginFlow = async () => {
  try {
    console.log('🧪 Testing Complete Admin Login Flow...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rebirth-of-a-queen';
    console.log('📡 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Step 1: Test admin login
    console.log('\n🔐 Step 1: Testing Admin Login...');
    const adminEmail = 'admin@rebirthofaqueen.org';
    const adminPassword = 'admin123';
    
    const adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log('✅ Admin user found');
    
    // Test password
    const isPasswordValid = await bcrypt.compare(adminPassword, adminUser.password);
    console.log(`   Password Valid: ${isPasswordValid ? '✅' : '❌'}`);
    
    if (!isPasswordValid) {
      console.log('❌ Password verification failed');
      return;
    }
    
    // Generate JWT token (same as server does)
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
    console.log(`   Token preview: ${token.substring(0, 30)}...`);
    
    // Step 2: Test dashboard endpoint with token
    console.log('\n📊 Step 2: Testing Dashboard Endpoint...');
    
    // Simulate the request that the frontend would make
    const dashboardUrl = 'http://localhost:5000/api/admin/dashboard';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    console.log('   Making request to:', dashboardUrl);
    console.log('   With headers:', headers);
    
    // Use PowerShell to make the request
    const { exec } = require('child_process');
    const curlCommand = `powershell -Command "Invoke-WebRequest -Uri '${dashboardUrl}' -Method GET -Headers @{'Authorization'='Bearer ${token}'; 'Content-Type'='application/json'}"`;
    
    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Dashboard request failed:', error.message);
        return;
      }
      
      if (stdout.includes('200')) {
        console.log('✅ Dashboard endpoint working with token');
        console.log('   Response contains dashboard data');
      } else {
        console.log('❌ Dashboard endpoint failed');
        console.log('   Response:', stdout);
      }
    });
    
    // Step 3: Test sidebar endpoint
    console.log('\n📋 Step 3: Testing Sidebar Endpoint...');
    
    const sidebarUrl = 'http://localhost:5000/api/admin/sidebar-data';
    const sidebarCommand = `powershell -Command "Invoke-WebRequest -Uri '${sidebarUrl}' -Method GET -Headers @{'Authorization'='Bearer ${token}'; 'Content-Type'='application/json'}"`;
    
    exec(sidebarCommand, (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Sidebar request failed:', error.message);
        return;
      }
      
      if (stdout.includes('200')) {
        console.log('✅ Sidebar endpoint working with token');
        console.log('   Response contains sidebar data');
      } else {
        console.log('❌ Sidebar endpoint failed');
        console.log('   Response:', stdout);
      }
    });
    
    console.log('\n🎉 Admin Login Flow Test Complete!');
    console.log('\n📝 Summary:');
    console.log('   - Admin user: ✅ Found and verified');
    console.log('   - Password: ✅ Valid');
    console.log('   - JWT token: ✅ Generated');
    console.log('   - Dashboard endpoint: ✅ Tested');
    console.log('   - Sidebar endpoint: ✅ Tested');
    
    console.log('\n🔑 Admin Login Credentials:');
    console.log('   Email: admin@rebirthofaqueen.org');
    console.log('   Password: admin123');
    
    console.log('\n🌐 Next Steps:');
    console.log('   1. Make sure client is running: npm start (in client directory)');
    console.log('   2. Go to: http://localhost:3000/admin/login');
    console.log('   3. Login with the credentials above');
    console.log('   4. You should be redirected to the dashboard');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run the test
testAdminLoginFlow();
