const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./models/User');

const testAdmin = async () => {
  try {
    console.log('🚀 Testing Admin System...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rebirth-of-a-queen';
    console.log('📡 Connecting to MongoDB...');
    console.log('   URI:', mongoUri);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Check if admin user exists
    const adminEmail = 'admin@rebirthofaqueen.org';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('👤 Admin user already exists');
      console.log(`   Name: ${existingAdmin.firstName} ${existingAdmin.lastName}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log(`   Active: ${existingAdmin.isActive}`);
      
      // Ensure role is admin
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Admin role updated');
      }
    } else {
      console.log('❌ Admin user not found. Creating new admin user...');
      
      // Create new admin user
      const newAdminUser = new User({
        firstName: 'Rebirth',
        lastName: 'Queen',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
        phone: '+254700000000'
      });

      await newAdminUser.save();
      console.log('✅ New admin user created successfully');
    }
    
    // Test database connection and models
    console.log('\n📊 Testing Database Models...');
    
    const userCount = await User.countDocuments();
    console.log(`   Total Users: ${userCount}`);
    
    const adminCount = await User.countDocuments({ role: 'admin' });
    console.log(`   Admin Users: ${adminCount}`);
    
    // Test JWT secret
    console.log('\n🔐 Testing JWT Configuration...');
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret) {
      console.log('✅ JWT Secret is configured');
    } else {
      console.log('❌ JWT Secret is missing');
    }
    
    console.log('\n🎉 Admin System Test Complete!');
    console.log('\n🔑 Admin Login Credentials:');
    console.log('   Email: admin@rebirthofaqueen.org');
    console.log('   Password: admin123');
    
    console.log('\n📝 Next Steps:');
    console.log('   1. Make sure your server is running (npm start)');
    console.log('   2. Make sure your client is running (npm start in client directory)');
    console.log('   3. Go to http://localhost:3000/admin');
    console.log('   4. Login with the credentials above');
    
  } catch (error) {
    console.error('❌ Admin test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run the test
testAdmin();
