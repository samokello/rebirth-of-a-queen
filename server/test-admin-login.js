const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const testAdminLogin = async () => {
  try {
    console.log('🚀 Testing Admin Login...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rebirth-of-a-queen';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    
    // Check if admin user exists
    const adminEmail = 'admin@rebirthofaqueen.org';
    const adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log('👤 Admin user found:');
    console.log(`   Name: ${adminUser.firstName} ${adminUser.lastName}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Role: ${adminUser.role}`);
    console.log(`   Active: ${adminUser.isActive}`);
    
    // Test password
    const isPasswordValid = await bcrypt.compare('admin123', adminUser.password);
    console.log(`   Password valid: ${isPasswordValid}`);
    
    if (isPasswordValid && adminUser.role === 'admin') {
      // Generate JWT token
      const JWT_SECRET = process.env.JWT_SECRET || 'rebirth-of-a-queen-super-secret-jwt-key-2024';
      const token = jwt.sign(
        { 
          userId: adminUser._id,
          email: adminUser.email,
          role: adminUser.role
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      console.log('\n🎉 Admin login test successful!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔑 Test Token:');
      console.log(token);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // Test the token with financial reports endpoint
      console.log('\n🧪 Testing financial reports endpoint...');
      const response = await fetch('http://localhost:5000/api/admin/financial-reports?type=overview&period=30', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Financial reports endpoint working!');
        console.log('Response:', JSON.stringify(data, null, 2));
      } else {
        const error = await response.text();
        console.log('❌ Financial reports endpoint failed:');
        console.log('Status:', response.status);
        console.log('Error:', error);
      }
      
    } else {
      console.log('❌ Admin login test failed');
    }
    
  } catch (error) {
    console.error('❌ Error testing admin login:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run test
testAdminLogin();