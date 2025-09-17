const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import User model
const User = require('./server/models/User');

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
    
    // Step 4: Test the exact API calls the frontend makes
    console.log('\n🌐 Step 4: Testing Frontend API Calls...');
    
    const baseUrl = 'http://localhost:5000/api';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Test dashboard endpoint
    console.log('\n📊 Testing Dashboard Endpoint...');
    try {
      const { exec } = require('child_process');
      const dashboardCommand = `powershell -Command "try { $response = Invoke-WebRequest -Uri '${baseUrl}/admin/dashboard' -Method GET -Headers @{'Authorization'='Bearer ${token}'; 'Content-Type'='application/json'} -UseBasicParsing; Write-Host 'Status:' $response.StatusCode; Write-Host 'Content:' $response.Content } catch { Write-Host 'Error:' $_.Exception.Message }"`;
      
      exec(dashboardCommand, (error, stdout, stderr) => {
        if (error) {
          console.log('❌ Dashboard request failed:', error.message);
        } else {
          console.log('📊 Dashboard Response:');
          console.log(stdout);
        }
      });
    } catch (error) {
      console.log('❌ Dashboard test error:', error.message);
    }
    
    // Test sidebar endpoint
    console.log('\n📋 Testing Sidebar Endpoint...');
    try {
      const sidebarCommand = `powershell -Command "try { $response = Invoke-WebRequest -Uri '${baseUrl}/admin/sidebar-data' -Method GET -Headers @{'Authorization'='Bearer ${token}'; 'Content-Type'='application/json'} -UseBasicParsing; Write-Host 'Status:' $response.StatusCode; Write-Host 'Content:' $response.Content } catch { Write-Host 'Error:' $_.Exception.Message }"`;
      
      exec(sidebarCommand, (error, stdout, stderr) => {
        if (error) {
          console.log('❌ Sidebar request failed:', error.message);
        } else {
          console.log('📋 Sidebar Response:');
          console.log(stdout);
        }
      });
    } catch (error) {
      console.log('❌ Sidebar test error:', error.message);
    }
    
    // Step 5: Test login endpoint
    console.log('\n🔑 Testing Login Endpoint...');
    try {
      const loginCommand = `powershell -Command "try { $body = '{\"email\":\"${adminEmail}\",\"password\":\"${adminPassword}\"}'; $response = Invoke-WebRequest -Uri '${baseUrl}/auth/login' -Method POST -Headers @{'Content-Type'='application/json'} -Body $body -UseBasicParsing; Write-Host 'Status:' $response.StatusCode; Write-Host 'Content:' $response.Content } catch { Write-Host 'Error:' $_.Exception.Message }"`;
      
      exec(loginCommand, (error, stdout, stderr) => {
        if (error) {
          console.log('❌ Login request failed:', error.message);
        } else {
          console.log('🔑 Login Response:');
          console.log(stdout);
        }
      });
    } catch (error) {
      console.log('❌ Login test error:', error.message);
    }
    
    console.log('\n🎯 Debugging Complete!');
    console.log('\n📝 Common Issues and Solutions:');
    console.log('   1. If dashboard returns 401/403: Authentication issue');
    console.log('   2. If dashboard returns 500: Server error');
    console.log('   3. If login fails: Check admin user credentials');
    console.log('   4. If client shows "Failed to load": Check browser console');
    
    console.log('\n🔧 Next Steps:');
    console.log('   1. Check the responses above');
    console.log('   2. If endpoints work, the issue is in the frontend');
    console.log('   3. Check browser console for JavaScript errors');
    console.log('   4. Verify localStorage has adminToken and adminUser');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run the debug
debugAdminDashboard();
