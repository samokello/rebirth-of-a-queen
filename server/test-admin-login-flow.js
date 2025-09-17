const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import User model
const User = require('./models/User');

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
    
    console.log('\n🎉 Admin Login Flow Test Complete!');
    console.log('\n📝 Summary:');
    console.log('   - Admin user: ✅ Found and verified');
    console.log('   - Password: ✅ Valid');
    console.log('   - JWT token: ✅ Generated');
    
    console.log('\n🔑 Admin Login Credentials:');
    console.log('   Email: admin@rebirthofaqueen.org');
    console.log('   Password: admin123');
    
    console.log('\n🌐 Next Steps:');
    console.log('   1. Make sure client is running: npm start (in client directory)');
    console.log('   2. Go to: http://localhost:3000/admin/login');
    console.log('   3. Login with the credentials above');
    console.log('   4. You should be redirected to the dashboard');
    
    console.log('\n🔧 If you still get "Failed to load dashboard data":');
    console.log('   1. Check browser console for errors');
    console.log('   2. Make sure you are logged in as admin');
    console.log('   3. Check that the admin token is stored in localStorage');
    console.log('   4. Verify the API URL is correct in your .env file');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run the test
testAdminLoginFlow();
